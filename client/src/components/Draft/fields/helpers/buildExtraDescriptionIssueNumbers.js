import { comicTypesList } from "@/util/data/comicTypesList.js";
import { comicVariationsList } from "@/util/data/comicVariationsList";

const addOrdinalSuffixOf = i => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

const parseComicType = (comicType = false) => {
  const cType = comicTypesList.filter(listType => {
    if (listType.ComicType == comicType) return true;
    return false;
  });

  if (cType.length == 1) {
    return cType[0].DisplayName;
  }
  return comicType;
};

const parseComicVariation = (comicVariation = false) => {
  const cType = comicVariationsList.filter(variationType => {
    if (variationType.Variation == comicVariation) return true;
    return false;
  });

  if (cType.length == 1) {
    return cType[0].DisplayName;
  }
  return comicVariation;
};

//
//title, issuse number, variation,  printing  comictype
//
export const buildExtraDescriptionIssueNumbers = issues => {
  const headerText = "Included Issues List:  ";

  const fullIssueTitlesList = issues.map(issue => {
    const fullTitle = issue.title;
    const issueNumber = `#${issue.issueNumber}`;
    const comicType = parseComicType(issue.comicType);
    const comicVariation = parseComicVariation(issue.variation);
    const printing = `${addOrdinalSuffixOf(issue.printing)} Printing`;

    return [fullTitle, issueNumber, comicVariation, printing, comicType]
      .filter(Boolean)
      .join(" ");
  });

  return headerText + fullIssueTitlesList.join(",   ");
};
