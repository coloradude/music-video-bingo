const fs = require('fs')

function csvToJson(csvContent) {
  // Split the content into lines
  const lines = csvContent.split("\n");

  // Remove the first line (headers)
  const rows = lines.slice(1);

  // Map each row to a JSON object
  const jsonArray = rows
    .filter(row => row.trim() !== "") // Ignore empty rows
    .map(row => {
      const columns = row.split(","); // Split row into columns by comma
      return {
        songAndArtist: columns[0]?.trim(),
        videoUrl: columns[1]?.trim(),
        startTime: columns[2]?.trim(),
        endTime: columns[3]?.trim(),
      };
    });

  return jsonArray;
}

// Example usage:
// const csvContent = `
// Song,URL,Start,End
// Greased Lightening by Grease,https://www.youtube.com/watch?v=wK63eUyk-iM,0:30,1:00
// So Sick by Ne-yo,https://www.youtube.com/watch?v=IxszlJppRQI,0:20,0:52
// Rocky Mountain High by John Denver,https://www.youtube.com/watch?v=TtFwqnaPqXY,0:23,0:54
// Wide Open Spaces by The Chicks (Dixie Chicks),https://www.youtube.com/watch?v=dom7VlltBUc,0:38,1:13
// Blame it on the Rain by Milli Vanilli,https://www.youtube.com/watch?v=BI5IA8assfk,0:38,1:14
// Gimme Gimme Gimme by ABBA,https://www.youtube.com/watch?v=XEjLoHdbVeE&list=PLdB2qly-JTgD3_kIrWe04D-w6rHI0b2MW,0:13,0:46
// "No Woman, no Cry by Bob Marley",https://www.youtube.com/watch?v=IT8XvzIfi4U,1:59,2:35
// The Climb by Miley Cyrus,https://www.youtube.com/watch?v=NG2zyeVRcbs,0:37,1:06
// Someone Like you by Adele,https://www.youtube.com/watch?v=hLQl3WQQoQ0,0:45,1:12
// Hey Judy by the Beatles,https://www.youtube.com/watch?v=A_MjCqQoLLA&list=PLX_AKA6xDYIlK6wMqtv9dPQGjg3znDNVV&index=20,1:28,2:03
// I Miss you by Blink 182,https://www.youtube.com/watch?v=s1tAYmMjLdY,2:25,2:58
// Stolen Dance by Milky Chance,https://www.youtube.com/watch?v=iX-QaNzd-0Y,1:56,2:33
// Mountain Music by Alabama,https://www.youtube.com/watch?v=M6WfM0cXWSQ,1:07,1:47
// Billie Jean by Michael Jackson,https://www.youtube.com/watch?v=Zi_XLOBDo_Y,2:01,2:41
// Stick Season by Noah Kahan,https://www.youtube.com/watch?v=JKrDdsgXuso,1:07,1:39
// Cowboy Cassanova by Carrie Underwood,https://www.youtube.com/watch?v=oM7NQQ0Lfu4,2:18,2:48
// Levels by Avicii,https://www.youtube.com/watch?v=_ovdm2yX4MA,0:17,0:53
// Maria Maria by Santana,https://www.youtube.com/watch?v=nPLV7lGbmT4,1:46,2:18
// Bejeweled by Taylor Swift,https://www.youtube.com/watch?v=b7QlX3yR2xs,2:35,3:07
// Only Wanna Be with You by Hootie & The Blowfish,https://www.youtube.com/watch?v=Ln6WQqRDrCo&list=PL4EDF0448D3DB6031&index=34,0:35,1:12
// Sugar by Maroon 5,https://www.youtube.com/watch?v=09R8_2nJtjg,0:42,1:20
// Summertime Sadness by Lana Del Rey,https://www.youtube.com/watch?v=TdrL3QxjyVw,1:12,1:46
// Gettin' Jiggy Wit It by Will Smith,https://www.youtube.com/watch?v=3JcmQONgXJM&list=RDCLAK5uy_mpx6f-Md6iPbWSaizatzQIHfcF33fmT7E&index=27,0:50,1:10
// No One by Alicia Keys,https://www.youtube.com/watch?v=rywUS-ohqeE&list=PLJsUzVz-hbMJa7mhcBs9gP94omY0Y4Qha,2:52,3:26
// Chattahoochee by Alan Jackson,https://www.youtube.com/watch?v=JW5UEW2kYvc,0:54,1:22
// Material Girl by Madonna,https://www.youtube.com/watch?v=6p-lDYPR2P8&list=RDEMaN9C20MoM3K8E1iVi3CAmg&index=3,3:06,3:51
// Sam Love by Macklemore,https://www.youtube.com/watch?v=hlVBg7_08n0,4:19,4:46
// `;

const csvContent = fs.readFileSync('mvb-sheet-2.csv', 'utf8')

const jsonOutput = csvToJson(csvContent);

fs.writeFileSync('mvb-json-2.json', JSON.stringify(jsonOutput, null, 2))
