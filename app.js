const input = document.querySelector('.search-input')
async function getGitHubUsername() {
    const username = input.value.trim()
    const API_URL = `https://api.github.com/users/${username}`;

    if (username === "") {
        alert("Please enter a GitHub username.");
    }
    else {
        try {
            const res = await fetch(API_URL);

            if (res.status === 404) {
                return alert("❌ User not found.");
            }
            const data = await res.json()
            // console.log(data)
            document.getElementById('avatar').src = data.avatar_url || 'https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg';
            document.getElementById('name').innerText = data.login || "No Name";
            document.getElementById('type').innerText = data.user_view_type || "Account Type Not  Available";
            document.getElementById('bio').innerText = data.bio || "No Bio Available";
            document.getElementById('location').innerText = data.location || "No Location Available";
            document.getElementById("usertype").innerText = data.type || "User Type Not Available";
            const url = document.getElementById('Url')
            url.href = data.html_url || "No Url Available";
            url.innerText = data.html_url || "No Url Available"

            document.getElementById("repos").innerText = data.public_repos || 0;
            document.getElementById("followers").innerText = data.followers || 0;
            document.getElementById("following").innerText = data.following || 0;

            document.getElementById("created_at").innerText = new Date(data.created_at).toDateString();

            localStorage.setItem("github Account User Name", username)

        } catch (err) {
            console.log(err.message)
            alert(`${err.message} data network error cause`)
        }

    }
}

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getGitHubUsername();
    }
});
const savedUsername = localStorage.getItem("github Account User Name");
if (savedUsername) {
    document.querySelector(".search-input").value = savedUsername;
    getGitHubUsername();
}
