/*
I ran this against the GDC
SELECT p.name FROM gcd_publisher p WHERE country_id = 225 AND issue_count > 1000 and series_Count > 100 ORDER BY NAME ASC LIMIT 500
*/

const publishersList = [
  "Acclaim",
  "Antarctic Press",
  "Archie",
  "Avatar Press",
  "Boom! Studios",
  "Caliber Press",
  "Charlton",
  "Dark Horse",
  "DC",
  "Dell",
  "Dynamite",
  "EC",
  "Fantagraphics",
  "Fawcett",
  "Harvey",
  "IDW",
  "Image",
  "Independent",
  "Kodansha USA",
  "Malibu",
  "Marvel",
  "NBM",
  "Oni Press",
  "Pines",
  "Seven Seas Entertainment",
  "Slave Labor",
  "Tokyopop",
  "Valiant",
  "Viz",
  "Western",
  "Yen Press",
  "Zenescope"
];

module.exports = publishersList;
