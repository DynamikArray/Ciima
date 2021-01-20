<script>
import { VEditDialog, VBtn, VMenu } from "vuetify/lib";

export default {
  extends: VEditDialog,
  props: {
    dialogColor: {
      type: [String],
      default: "grey darken-2"
    }
  },
  methods: {
    genButton(fn, text) {
      let buttonColor = "primary";
      if (text == this.saveText) buttonColor = "success";
      if (text == this.cancelText) buttonColor = "error";
      return this.$createElement(
        VBtn,
        {
          class: { "mx-2 my-2": true },
          props: { color: buttonColor, light: true },
          on: { click: fn }
        },
        text
      );
    }
  },

  render(h) {
    return h(
      VMenu,
      {
        staticClass: "v-small-dialog",
        class: this.themeClasses,
        props: {
          contentClass: `v-small-dialog__menu-content pa-1 ${this.dialogColor} `,
          transition: this.transition,
          origin: "top right",
          right: true,
          value: this.isActive,
          closeOnClick: !this.persistent,
          closeOnContentClick: false,
          eager: this.eager,
          light: this.light,
          dark: this.dark
        },
        on: {
          input: val => (this.isActive = val)
        },
        scopedSlots: {
          activator: ({ on }) => {
            return h(
              "div",
              {
                staticClass: "v-small-dialog__activator",
                on
              },
              [
                h(
                  "span",
                  {
                    staticClass: "v-small-dialog__activator__content"
                  },
                  this.$slots.default
                )
              ]
            );
          }
        }
      },
      [this.genContent(), this.large ? this.genActions() : null]
    );
  }
};
</script>

<style scoped></style>
