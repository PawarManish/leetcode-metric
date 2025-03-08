document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLebel = document.getElementById("easy-lebel");
  const mediumLebel = document.getElementById("medium-lebel");
  const hardLebel = document.getElementById("hard-lebel");
  const cardStatsContainer = document.querySelector(".stats-card");

  // return true or false based on a regex;
  function validataUsername(username) {
    if (username.trim() == "") {
      alert("username should not be empty");
      return false;
    }

    const regex = /^[a-zA-Z0-9_]{4,16}$/; // The "/  /" symbols in JavaScript define a regular expression literal.
    //  /exp/ => / (/ → Opening delimiter (marks the start of the regex).) , ^[a-zA-Z0-9_]{4,16}$ → Actual regex pattern. , / → Closing delimiter (marks the end of the regex).
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Inavalid Username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    // write header

    try {
      searchBtn.textContent = "Searching...";
      searchBtn.disabled = true;
      statsContainer.style.setProperty("visibility", "hidden");
      // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      // const targetUrl = "https://leetcode.com/graphql";
      const myHeader = new Headers();
      myHeader.append("content-type", "application/json");

      // const graphql = JSON.stringify({
      //   // ise capital JSON
      //   query:
      //     "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
      //   variables: { username: `${username}` },
      // });

      // const requestOptions = {
      //   method: "POST",
      //   headers: myHeader,
      //   body: graphql,
      // };

      // const response = await fetch(proxyUrl + targetUrl, requestOptions);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("unable to fetch the user details");
      }
      const parseData = await response.json();
      console.log("loggind data : ", parseData);

      displayUserData(parseData);
    } catch (error) {
      statsContainer.innerHTML = `<p>${error.message}</p>`;
    } finally {
      searchBtn.textContent = "Search";
      statsContainer.style.setProperty("visibility", "visible");

      searchBtn.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }

  function displayUserData(parseData) {
    // const totalQuestion = parseData.data.allQuestionsCount[0].count;
    // const totalEasyQuestion = parseData.data.allQuestionsCount[1].count;
    // const totalMediumQuestion = parseData.data.allQuestionsCount[2].count;
    // const totalHardQuestion = parseData.data.allQuestionsCount[3].count;

    // const solvetotalQuestion =
    //   parseData.data.matchedUser.submitStats.acSubmissionNum[0].count;
    // const solvetotalEasyQuestion =
    //   parseData.data.matchedUser.submitStats.acSubmissionNum[1].count;
    // const solvetotalMediumQuestion =
    //   parseData.data.matchedUser.submitStats.acSubmissionNum[2].count;
    // const solvetotalHardQuestion =
    //   parseData.data.matchedUser.submitStats.acSubmissionNum[3].count;

    const totalQuestion = parseData.totalQuestions;
    const totalEasyQuestion = parseData.totalEasy;
    const totalMediumQuestion = parseData.totalMedium;
    const totalHardQuestion = parseData.totalHard;

    const solvetotalQuestion = parseData.totalSolved;
    const solvetotalEasyQuestion = parseData.easySolved;
    const solvetotalMediumQuestion = parseData.mediumSolved;
    const solvetotalHardQuestion = parseData.hardSolved;

    updateProgress(
      solvetotalEasyQuestion,
      totalEasyQuestion,
      easyLebel,
      easyProgressCircle
    );
    updateProgress(
      solvetotalMediumQuestion,
      totalMediumQuestion,
      mediumLebel,
      mediumProgressCircle
    );
    updateProgress(
      solvetotalHardQuestion,
      totalHardQuestion,
      hardLebel,
      hardProgressCircle
    );

    // const cardData = [
    //   {
    //     label: "Overall Submission",
    //     value:
    //       parseData.data.matchedUser.submitStats.totalSubmissionNum[0]
    //         .submissions,
    //   },
    //   {
    //     label: "Overall Easy Submission",
    //     value:
    //       parseData.data.matchedUser.submitStats.totalSubmissionNum[1]
    //         .submissions,
    //   },
    //   {
    //     label: "Overall Medium Submission",
    //     value:
    //       parseData.data.matchedUser.submitStats.totalSubmissionNum[2]
    //         .submissions,
    //   },
    //   {
    //     label: "Overall Hard Submission",
    //     value:
    //       parseData.data.matchedUser.submitStats.totalSubmissionNum[3]
    //         .submissions,
    //   },
    // ];
    // console.log("card ka dataa: ", cardData);

    // cardStatsContainer.innerHTML = cardData
    //   .map((data) => {
    //     return `<div class='card'>
    //         <h4>${data.label}</h4>
    //         <p>${data.value}</p>
    //     </div>`;
    //   })
    //   .join(""); // .join("") to remove , and add ""
  }

  searchBtn.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("login username: ", username);
    if (validataUsername(username)) {
      //   console.log("validation done");
      fetchUserDetails(username);
    }
  });
});
