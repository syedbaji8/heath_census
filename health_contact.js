function thankyou() {
    // name email condition message
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const condition = document.getElementById('condition').value;
    const message = document.getElementById('message').value;
    try {
        if (name === '' && email === '' && condition === '' && message === '') {
            throw new Error('Please fill mandatory inputs!')
        }
        alert("Thank you for contacting us!");
    } catch (error) {
        console.log(error.message)
    }
}