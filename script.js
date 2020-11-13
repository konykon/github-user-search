$("#search-button").click(() => {
	displayContent().catch((e) => {
		$("#exist").hide();
		$("#notExist").show();
	});
	$('#search').val("");
});

const get = async (url) => {
	let response = await fetch(url, {
		method: "GET",
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return await response.json();
}

const displayContent = async () => {
	let user = $("#search").val();
	const urlUser = get(`https://api.github.com/users/${user}`);
	const urlRepo = get(`https://api.github.com/users/${user}/repos`);

	let urls = await Promise.all([urlUser, urlRepo]);

	generateUserData(urls[0]);
	generateReposData(urls[1]);
	$("#notExist").hide();
	$("#exist").show();
}

const generateUserData = (userData) => {
	$("#avatar").attr("src", userData.avatar_url);
	$("#userName").text('@' + userData.login);
	$("#name").text(userData.name);
	$("#bio").text(userData.bio);
}

const generateReposData = (dataArr) => {
	$("#list").html("");
	if (dataArr.length > 0) {
		dataArr.forEach(data => {
			let $li = $("<li></li>").appendTo("#list");
			$li.html(`${data.name}<span><i class="fas fa-star"></i>${data.stargazers_count}<i class="fas fa-code-branch"></i>${data.forks}</span>`);
		});
	} else {
		let $li = $("<li></li>").appendTo("#list");
		$li.html("<span class='noRepo'>This user has no repositories</span>");
	}
}