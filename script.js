async function loadPosts() {
    let box = document.getElementById("feed");
    box.innerHTML = "Loading...";

    try {
        let res = await fetch("http://localhost:3000/posts");
        let posts = await res.json();
        box.innerHTML = "";

        posts.reverse().forEach(p => {
            box.innerHTML += `
                <div class="post">
                    <b>${p.user}</b><br>
                    ${p.message}<br>
                    <span class="time">${p.time}</span>
                </div>
            `;
        });
    } catch (e) {
        box.innerHTML = "Could not load posts 😕 (Is backend running?)";
    }
}

async function addPost() {
    let user = document.getElementById("user").value;
    let msg = document.getElementById("msg").value;

    if (!user || !msg) {
        alert("Enter name & message");
        return;
    }

    await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user, message: msg, time: new Date().toLocaleString()})
    });

    document.getElementById("msg").value = "";
    loadPosts();
}

// Load posts on page open
loadPosts();
