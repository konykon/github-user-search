var userData;
var reposData;

function apiCall() {
	var site = "https://api.github.com/users/";
	var user = document.getElementById("search").value;
	var userUrl = site + user;
	getUserData(userUrl);
}

var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
	apiCall();
	document.getElementById('search').value = "";
});

function getUserData(pageUrl) {
	fetch(pageUrl, {
		method: "GET",
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			showDiv('notExist', 'exist');
		}
		throw new Error(response.statusText);
	}).then(function (json) {
		userData = json;
		generateUserInfo(userData);
		getReposData(userData.repos_url);
		showDiv('exist', 'notExist');
	}).catch(function (error) {
		console.log("Request failed: " + error.message);
	});
}

function getReposData(pageUrl) {
	fetch(pageUrl, {
		method: "GET",
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.statusText);
	}).then(function (json) {
		reposData = json;
		generateReposInfo(reposData);
	}).catch(function (error) {
	});
}

function generateUserInfo(dataObj) {
	var avatar = document.getElementById("avatar");
	var userName = document.getElementById("userName");
	var name = document.getElementById("name");
	var bio = document.getElementById("bio");
	avatar.setAttribute("src", dataObj.avatar_url);
	userName.innerHTML = '@' + dataObj.login;
	name.innerHTML = dataObj.name;
	bio.innerHTML = dataObj.bio;
}

function generateReposInfo(dataArr) {
	var list = document.getElementById("list");
	list.innerHTML = " ";
	if (dataArr.length > 0) {
		for (var i = 0; i < dataArr.length; i++) {
			var li = document.createElement('li');
			list.appendChild(li);
			li.innerHTML = '<div class="repo-name">' + dataArr[i].name + '</div><span class="span"><i class="fas fa-star"></i> ' + dataArr[i].stargazers_count + ' <i class="fas fa-code-branch"></i> ' + dataArr[i].forks + '</span>';
		}
	} else {
		li = document.createElement('li');
		list.appendChild(li);
		li.innerHTML = "<span class='noRepo'>This user has no repositories</span>";
	}
}

function showDiv(ID, Id) {
	var DivToShow = document.getElementById(ID);
	var DivToHide = document.getElementById(Id);
	DivToShow.classList.remove("hidden");
	DivToShow.classList.add("visible");
	DivToHide.classList.remove("visible");
	DivToHide.classList.add("hidden");
}