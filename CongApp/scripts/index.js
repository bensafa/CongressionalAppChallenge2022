
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const firstName = document.querySelector('.navFirstName');
const lastName = document.querySelector('.navLastName');

let doctorName = "";

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('doctors').doc(user.uid).get().then(doc => {
      doctorName = doc.data().firstName + doc.data().lastName;
      window.doctorName = doc.data().firstName + doc.data().lastName;
      window.userEmail = user.email;
      const html = `
      <div>Logged in as Dr. ${doc.data().firstName} ${doc.data().lastName}</div>
      <div>Email: ${user.email}</div>
      `
      const navbar = `
      <h7 class="grey-text"> Welcome, ${doc.data().firstName} </h7>
      `
      accountDetails.innerHTML = html;
      firstName.innerHTML = navbar;
    });
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // hide account info
    accountDetails.innerHTML = "";
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

  });

// messaging

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// adding a new message
async function saveMessage(messageText) {
  // Add a new message entry to the Firebase database.
  try {
    await db.collection(doctorName).doc(makeid(20)).set({
      _id: makeid(20),
      text: messageText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: {_id: auth.currentUser.email, avatar: "https://cdn.discordapp.com/attachments/699076816647749664/1036964530296733756/image-removebg-preview.png"}
    });
    $("#message").val("");
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

async function loadMessages() {
  // i fuck dudes https://e621.net/posts/1301740
  console.log(window.doctorName);
  const messageHtml = (await db.collection(window.doctorName).get()).docs.map(doc => doc.data()).sort((a, b) => a.createdAt.seconds - b.createdAt.seconds).slice(0, 12).map(doc => `<div class="row"><div class="card-panel ${doc.user._id !== window.userEmail ? "left" : "right"}">${doc.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="${doc.user.avatar}" height="20px"><br>${(new Date(doc.createdAt.seconds * 1000)).toLocaleString()}</div></div>`).join("");
  $("#messages").html(messageHtml);
  if (messageHtml !== window.prevHtml) $("html, body").scrollTop($(document).height());
  window.prevHtml = messageHtml;
}

setTimeout(() => {
  loadMessages();
  setInterval(loadMessages, 50);
}, 2000);