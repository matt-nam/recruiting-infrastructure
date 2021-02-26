function generateApplication(univ, firstName, lastName, gender, industry, hours, international, major, org, rating, talentPool, appId, rank1, rank2, rank3, year) {
    var obj = {
        "Acknowledgement": true,
        "AdditionalFile": "S3 Link to additional file",
        "AdditionalInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "ApplicationId": appId,
        "Aspirations": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Authorization": "",
        "CreatedAt": "2021-01-08, 17:41:22",
        "Disability": "None",
        "Email": firstName+"@gmail.com",
        "Ethnicity": "",
        "FirstName": firstName,
        "Funding": [
          "Series A"
        ],
        "Gender": gender,
        "Hours": hours,
        "Industry": industry,
        "Interests": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "International": international,
        "Intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "LastName": lastName,
        "LinkedIn": "LinkedIn Link",
        "Major": major,
        "MatchedLater": true,
        "Organization": org,
        "PhoneNumber": "",
        "pk": "APPLICATION#"+appId,
        "Portfolio": "This is my portfolio",
        "ProfitType": "Any",
        "Rank1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Rank2": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Rank3": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "RecruiterNotes": {
          "ExtraMaterial": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "GeneralNotes": [
            {
              "CreatedAt": "2/6/2021",
              "Notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              "RecruiterId": "1"
            }
          ],
          "InterviewNotes": [
            {
              "CreatedAt": "2/6/2021",
              "Notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              "RecruiterId": "2"
            }
          ],
          "NotableApplication": true,
          "PositionPairing": [
            "1"
          ],
          "Rating": rating,
          "StartupPairing": [
            "1"
          ],
          "TalentPools": talentPool,
          "Withdrawn": false
        },
        "Reference": "From a friend",
        "Responses": [
          {
            "Question": "What kind of role do you play on a team?",
            "Response": "I help people"
          }
        ],
        "Resume": "S3 link to resume (not filled yet)",
        "Round": 2,
        "sk": "#APPLICATION#"+appId,
        "Skills": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Startups": [
          rank1,
          rank2,
          rank3
        ],
        "University": univ,
        "Video": "S3 link to video (not filled yet)",
        "Year": year
    };
    return obj;
}

function makeName(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
} // use for FirstName, LastName, Email

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

var universities = ["Princeton University", "Harvard University", "Columbia University", "Massachusetts Institute of Technology", "Yale University", "Stanford University", "University of Chicago", "University of Pennsylvania", "California Institute of Technology", "Johns Hopkins University", "Northwestern University", "Duke University", "Dartmouth College", "Brown University", "Vanderbilt University", "Rice University", "Washington University in St. Louis", "Cornell University", "University of Notre Dame", "University of California--Los Angeles", "Emory University", "University of California--Berkeley", "Georgetown University", "University of Michigan--Ann Arbor", "University of Southern California", "Carnegie Mellon University", "University of Virginia", "University of North Carolina--Chapel Hill", "Wake Forest University", "New York University", "Tufts University", "University of California--Santa Barbara", "University of Florida", "University of Rochester", "Boston College", "Georgia Institute of Technology", "University of California--Irvine", "University of California--San Diego", "University of California--Davis"];

var genders = ["Male", "Female"];
var industries = ["Software", "Hardware", "Cloud Services", "Internet", "Consumer Electronics", "Infrastructure", "Robotics", "Artificial Intelligence", "Consulting", "Business Process Outsourcing", "Information Security", "Data Providers", "Data Platforms", "Design", "Games", "Entertainment", "Art, Performing Art &amp; Music", "Media", "Marketing", "Education", "Architectural Technology", "Agricultural Technology", "Finance", "Insurance", "Healthcare", "Space", "Science", "Energy", "IoT", "Fashion", "Transportation"];
// Hours
var internationals = ["Yes","No"];
var majors = ["African American Studies", "African Studies", "American Studies", "Anthropology", "Applied Mathematics", "Applied Physics", "Archaeological Studies", "Architecture", "Art", "Astronomy", "Astrophysics", "Biomedical Engineering", "Chemical Engineering", "Chemistry", "Classical Civilization", "Classics", "Cognitive Science", "Comparative Literature", "Computer Science", "Computer Science and Economics", "Computer Science and Mathematics", "Computer Science and Psychology", "Computing and the Arts", "Earth and Planetary Sciences", "East Asian Languages and Literatures", "East Asian Studies", "Ecology and Evolutionary Biology", "Economics", "Economics and Mathematics", "Electrical Engineering", "Electrical Engineering and Computer Science", "Engineering Sciences (Chemical)", "Engineering Sciences (Electrical)", "Engineering Sciences (Environmental)", "Engineering Sciences (Mechanical)", "English", "Environmental Engineering", "Environmental Studies", "Ethics, Politics, and Economics", "Ethnicity, Race, and Migration", "Film and Media Studies", "French", "German Studies", "Global Affairs", "Greek, Ancient and Modern", "History", "History of Art", "History of Science, Medicine, and Public Health", "Humanities", "Italian", "Judaic Studies", "Latin American Studies", "Linguistics", "Mathematics", "Mathematics and Philosophy", "Mathematics and Physics", "Mechanical Engineering", "Modern Middle East Studies", "Molecular Biophysics and Biochemistry", "Molecular, Cellular, and Developmental Biology", "Music", "Near Eastern Languages and Civilizations", "Neuroscience", "Philosophy", "Physics", "Physics and Geosciences", "Physics and Philosophy", "Political Science", "Portuguese", "Psychology", "Religious Studies", "Russian", "Russian and East European Studies", "Sociology", "Spanish", "Special Divisional Major", "Statistics and Data Science", "Theater and Performance Studies", "Urban Studies", "Women’s, Gender, and Sexuality Studies"];
// Organization: University + " Entrepreneurial Club"
// Rating: 1 to 5
var talentPools = ["SWE", "Data Science", "Marketing", "Design"];
// Randomize Application ID 
var startupIDs = ["0824d385-520b-11eb-bf5d-08d40c610f6b", "0b206356-520b-11eb-bcf2-08d40c610f6b", "085b6261-520b-11eb-b13b-08d40c610f6b", "0ae0fa72-520b-11eb-8991-08d40c610f6b", "080a6245-520b-11eb-a4c2-08d40c610f6b", "0d428d75-520b-11eb-8d75-08d40c610f6b", "0e060471-520b-11eb-8494-08d40c610f6b", "0440bf09-520b-11eb-aa6c-08d40c610f6b", "04e113fd-520b-11eb-889b-08d40c610f6b", "04714512-520b-11eb-9af9-08d40c610f6b", "0535f38b-520b-11eb-9092-08d40c610f6b", "0d5fb28d-520b-11eb-a14f-08d40c610f6b", "0d97b25a-520b-11eb-bcb6-08d40c610f6b", "0dd02768-520b-11eb-91d9-08d40c610f6b", "0f9eb555-520b-11eb-a9cd-08d40c610f6b", "0affa7e4-520b-11eb-a33b-08d40c610f6b", "05752f7c-520b-11eb-bf6e-08d40c610f6b", "07ee52ee-520b-11eb-ad3f-08d40c610f6b", "08969ff0-520b-11eb-8ca9-08d40c610f6b", "042791e5-520b-11eb-b7e4-08d40c610f6b", "0a675318-520b-11eb-9866-08d40c610f6b", "08eb17cc-520b-11eb-8749-08d40c610f6b", "087a2667-520b-11eb-8847-08d40c610f6b", "04588cc2-520b-11eb-9ba3-08d40c610f6b", "05b0f32d-520b-11eb-aa52-08d40c610f6b", "05567ec4-520b-11eb-9ca1-08d40c610f6b", "0592eee5-520b-11eb-92a9-08d40c610f6b", "051b62b8-520b-11eb-a46c-08d40c610f6b", "0a2dbb04-520b-11eb-86aa-08d40c610f6b", "0e3d8f4d-520b-11eb-bbb1-08d40c610f6b", "0db39eae-520b-11eb-a814-08d40c610f6b", "0fd97674-520b-11eb-816d-08d40c610f6b", "0ff9673b-520b-11eb-b182-08d40c610f6b", "040f9cdd-520b-11eb-8b9b-08d40c610f6b", "0f62681f-520b-11eb-a152-08d40c610f6b", "0fbc011a-520b-11eb-af83-08d40c610f6b", "0ac31271-520b-11eb-8929-08d40c610f6b", "04c28397-520b-11eb-85e9-08d40c610f6b", "04a60409-520b-11eb-85e1-08d40c610f6b", "05ccb890-520b-11eb-b2bd-08d40c610f6b", "03f78114-520b-11eb-ba86-08d40c610f6b", "0908518e-520b-11eb-ac9e-08d40c610f6b", "0f80a5a3-520b-11eb-8468-08d40c610f6b", "03bc4cc2-520b-11eb-af02-08d40c610f6b", "083fe23a-520b-11eb-a245-08d40c610f6b", "0d7bed2a-520b-11eb-b3c0-08d40c610f6b", "0deb50b3-520b-11eb-8380-08d40c610f6b", "08b3a827-520b-11eb-ae3b-08d40c610f6b", "0e217bbe-520b-11eb-8376-08d40c610f6b", "0a4c8d74-520b-11eb-9d27-08d40c610f6b"];
var years = [2021,2022,2023,2024];
var possibleHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];


var numOfApps = 500;
var generatedApps = [];

for (var i = 0; i < numOfApps; i++) {
    var univ = getRandom(universities, 1)[0];
    var firstName = makeName(10);
    var lastName = makeName(10);
    var gender = getRandom(genders, 1)[0];
    var industry = getRandom(industries, 3);
    var hours;
    if (getRandom(possibleHours,1)[0] > 15) {
        hours = [40,40];
    } else {
        var h = getRandom(possibleHours,2);
        hours = [Math.min(...h), Math.max(...h)];
    }
    var international = getRandom(internationals, 1)[0];
    var major = getRandom(majors, 1)[0];
    var org = univ + " Entrepreneurial Club";
    var rating = randomIntFromInterval(1,5);
    var talentPool = getRandom(talentPools, 2);
    var appId = randomIntFromInterval(1000000000,9999999999);
    var s = getRandom(startupIDs, 3);
    var rank1 = s[0];
    var rank2 = s[1];
    var rank3 = s[2];
    var year = getRandom(years, 1)[0];
    generatedApps[i] = generateApplication(univ, firstName, lastName, gender, industry, hours, international, major, org, rating, talentPool, appId, rank1, rank2, rank3, year);
}

// var fs = require('fs');
// var x = JSON.stringify(generatedApps);
// fs.writeFile('apps.js', x, function(err) {
//     if (err) throw err;
// });

// console.log(generatedApps);
