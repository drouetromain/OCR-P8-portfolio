function Contact() {
    return (
        <article className="hp-article-contact">
            <h2 className="hp-h2 gradient-text" id="contact">Contactez-moi</h2>
            <div className="hp-div hp-description">Une idée ? Un projet ? N'hésitez-pas à me contacter pour toutes demandes d'informations ou devis.</div>
            <form action="/ma-page-de-traitement" method="post" className="hp-contact-form">
                <div className="hp-form-name-fields">
                    <div className="hp-form-half-field">
                        <label htmlFor="firstname">Prénom&nbsp;:</label>
                        <input type="text" id="firstname" name="user_firstname"/>
                    </div>
                    <div className="h-separator"></div>
                    <div className="hp-form-half-field">
                        <label htmlFor="name">Nom&nbsp;:</label>
                        <input type="text" id="name" name="user_name"/>
                    </div>
                </div>
                <label htmlFor="mail">E-mail&nbsp;:</label>
                <input type="email" id="mail" name="user_mail"/>
                <label htmlFor="subject">Sujet&nbsp;:</label>
                <input type="text" id="subject" name="user_subject"/>
                <label htmlFor="msg">Message&nbsp;:</label>
                <textarea id="msg" name="user_message"></textarea>
                <div className="hp-form-submit-button">
                    <button type="submit" className="hp-contact-form-button">Envoyer le message</button>   
                </div>
                
            </form>
        </article>
    )
}

export default Contact