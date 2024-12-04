// function checkAuth(authUrl) {
//     const accessToken = localStorage.getItem('spotify_access_token');

//     if (!accessToken) {
//         window.location.href = 'login';
//         document.getElementById("logout-btn").style.display = "none";

//     } else {
//         document.getElementById("logout-btn").style.display = "block";
//         window.location.href = authUrl;


//     }
// }

// // Handle Spotify authentication after redirect
// var hash1 = window.location.hash;
// if (hash1) {
//     // Extract the access token from the URL hash
//     const params = new URLSearchParams(hash1.substring(1)); // Remove the '#' and parse the parameters
//     const accessToken = params.get('access_token');
//     const expiresIn = params.get('expires_in');

//     if (accessToken) {
//         // Store the token and expiration time in localStorage
//         localStorage.setItem('spotify_access_token', accessToken);
//         localStorage.setItem('token_expiry', Date.now() + expiresIn * 1000); // Store expiration time in milliseconds

//         // Optionally, clean the URL hash (remove the token from the URL)
//         history.replaceState(null, null, ' '); // Removes the hash part from the URL

//         console.log('Access token stored in localStorage:', accessToken);
//     }
// }


// // Spotify API variables
// var clientId = '9c8122aea24849d88527635210542f45'; // Replace with your actual Spotify Client ID
// var redirectUri = 'http://localhost:4000'; // Replace with your live URL when deploying
// var scopes = 'user-top-read';



// // Redirect to Spotify login
// document.getElementById('spotify-login-btn').addEventListener('click', (event) => {
//     event.preventDefault(); // Prevent default anchor behavior
//     const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
//     window.location.href = authUrl;

// });


// var path = window.location.pathname;

// // if (path === '/') {
// //     checkAuth();
// // }
