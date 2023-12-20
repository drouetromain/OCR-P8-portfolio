function Contact() {
    return (
        <article className="hp-article-contact">
            <h2 className="hp-h2">Contact</h2>
            <div className="hp-div">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <form action="/ma-page-de-traitement" method="post" className="hp-contact-form">
                <label htmlFor="firstname">Prénom&nbsp;:</label>
                <input type="text" id="firstname" name="user_firstname"/>
                <label htmlFor="name">Nom&nbsp;:</label>
                <input type="text" id="name" name="user_name"/>
                <label htmlFor="mail">E-mail&nbsp;:</label>
                <input type="email" id="mail" name="user_mail"/>
                <label htmlFor="subject">Sujet&nbsp;:</label>
                <input type="text" id="subject" name="user_subject"/>
                <label htmlFor="msg">Message&nbsp;:</label>
                <textarea id="msg" name="user_message"></textarea>
                <button type="submit" className="hp-contact-form-button">Envoyer le message</button>
            </form>
        </article>
    )
}

export default Contact