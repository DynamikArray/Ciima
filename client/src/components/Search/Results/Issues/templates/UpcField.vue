<template>
  <div class="d-flex flex-grow-1" id="issueUpcForm">
    <div class="mx-3">
      <p class="mt-2 IssueTopLabel">Scan UPC:</p>
    </div>
    <div class="mx-1">
      <v-text-field
        style="minWidth:220px"
        ref="searchUpc"
        autofocus
        autocomplete="off"
        class="pt-0"
        :class="{ shakeAnimation: shake }"
        v-model="upcString"
        @input="searchUpc"
        prepend-icon="fa fa-barcode"
        label=""
        single-line
        hide-details
        :rules="[]"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_UPC } from "@/store/action-types.js";
import debounce from "lodash.debounce";

export default {
  props: {},
  data() {
    return {
      upcString: "",
      shake: false
    };
  },
  watch: {
    upcString(val) {
      if (val.length > 0) this.shake = false;
    }
  },
  methods: {
    searchUpc: debounce(function(val) {
      if (!val.length == 0) {
        if (!Number.isNaN(Number(val))) {
          if (val.length == 17) {
            this.fetchTitlesByUpc(val);
          } else {
            let alertMsg = `<b>Invalid UPC detected:</b><br /><b>${val}</b><br/>
                  Not enough characters, try rescanning.`;
            this.alertUser(alertMsg);
          }
        } else {
          let alertMsg = `<b>Invalid UPC detected:</b><br /><b>${val}</b><br/>
                Non Numeric characters were detected.`;
          this.alertUser(alertMsg);
        }
      }
    }, 500),
    //
    //
    fetchTitlesByUpc(search) {
      this.$store
        .dispatch(`titleSearch/${SEARCH_UPC}`, {
          query: search,
          upc: 1
        })
        .then(res => {
          this.upcString = "";
          this.shake = true;
        });
    },
    alertUser(msg) {
      this.upcString = "";
      this.$toastr.Add({
        msg,
        timeout: 2000,
        type: "warning"
      });
      this.shake = true;
    }
  }
};
</script>

<style scoped>
.shakeAnimation {
  -webkit-animation: kf_shake 0.4s 1 linear;
  -moz-animation: kf_shake 0.4s 1 linear;
  -o-animation: kf_shake 0.4s 1 linear;
}
@-webkit-keyframes kf_shake {
  0% {
    -webkit-transform: translate(30px);
  }
  20% {
    -webkit-transform: translate(-30px);
  }
  40% {
    -webkit-transform: translate(15px);
  }
  60% {
    -webkit-transform: translate(-15px);
  }
  80% {
    -webkit-transform: translate(8px);
  }
  100% {
    -webkit-transform: translate(0px);
  }
}
@-moz-keyframes kf_shake {
  0% {
    -moz-transform: translate(30px);
  }
  20% {
    -moz-transform: translate(-30px);
  }
  40% {
    -moz-transform: translate(15px);
  }
  60% {
    -moz-transform: translate(-15px);
  }
  80% {
    -moz-transform: translate(8px);
  }
  100% {
    -moz-transform: translate(0px);
  }
}
@-o-keyframes kf_shake {
  0% {
    -o-transform: translate(30px);
  }
  20% {
    -o-transform: translate(-30px);
  }
  40% {
    -o-transform: translate(15px);
  }
  60% {
    -o-transform: translate(-15px);
  }
  80% {
    -o-transform: translate(8px);
  }
  100% {
    -o-origin-transform: translate(0px);
  }
}
</style>
