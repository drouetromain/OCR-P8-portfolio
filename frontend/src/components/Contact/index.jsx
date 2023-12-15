function Contact() {
    return (
        <div>
            <h2>Contact</h2>
            <form action="/ma-page-de-traitement" method="post">
                <ul>
                    <li>
                    <label htmlFor="firstname">Prénom&nbsp;:</label>
                    <input type="text" id="firstname" name="user_firstname" />
                    </li>
                    <li>
                    <label htmlFor="name">Nom&nbsp;:</label>
                    <input type="text" id="name" name="user_name" />
                    </li>
                    <li>
                    <label htmlFor="mail">E-mail&nbsp;:</label>
                    <input type="email" id="mail" name="user_mail" />
                    </li>
                    <li>
                    <label htmlFor="subject">Sujet&nbsp;:</label>
                    <input type="text" id="subject" name="user_subject" />
                    </li>
                    <li>
                    <label htmlFor="msg">Message&nbsp;:</label>
                    <textarea id="msg" name="user_message"></textarea>
                    </li>
                </ul>
                <div className="button">
                    <button type="submit">Envoyer le message</button>
                </div>
            </form>
        </div>
    )
}

export default Contact