
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const firstName = document.querySelector('.navFirstName');
const lastName = document.querySelector('.navLastName');
const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('doctors').doc(user.uid).get().then(doc => {
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
    await db.collection('JaneDoe').doc(makeid(20)).set({
      _id: makeid(20),
      text: messageText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: {_id: auth.currentUser.email, avatar: "https://cdn.discordapp.com/attachments/699076816647749664/1036964530296733756/image-removebg-preview.png"}
    });
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

