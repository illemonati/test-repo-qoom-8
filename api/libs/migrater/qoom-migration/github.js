export const connectToGithub = async () => {
	console.log('connectToGithub');
	const githubAccessToken = document.getElementById('githubAccessToken').value;
	const githubRepoName = document.getElementById('githubRepoName').value;
	console.log(githubAccessToken);
	const resp = await fetch('../connect-to-github', {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			'accessToken': githubAccessToken,
			'repoName': githubRepoName
		})
	});
	console.log(resp);
}