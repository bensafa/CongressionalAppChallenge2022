
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        setupUI(user);
    } else {
        console.log("user logged out.");
        setupUI();
    }
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //console.log(email, password);

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        return db.collection('doctors').doc(cred.user.uid).set({
            firstName: signupForm['signup-fname'].value,
            lastName: signupForm['signup-lname'].value,
            avatar: "https://cdn.discordapp.com/attachments/699076816647749664/1036964530296733756/image-removebg-preview.png"
        });

    }).then(() => {
        db.collection(firstName+lastName).doc("dummyDoc").set({
            text: "Welcome to your conversation with " + firstName + " " + lastName + "!",
        });
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {

        // close login modal and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});