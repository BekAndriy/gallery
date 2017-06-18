import React from 'react';


class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='about-us container'>
                <div className="label">About Gallery</div>
                <div className="text">
                    Проект містити декілька сторінок. Основний контент знаходиться на сторінці 'Gallery', це є картинки з описом. Присутня валідація форми реєстрації на сайті та є 3 ролі 'admin, guest, user'. 'Admin' має доступ до всього контенту, що знаходить на сайті, він може додавати та редагувати його. Також адміністратор має доступ до списку зареєстрованих користувачів, де він може міняти їхні ролі та бачити поточну інформацію про користувача
                    <p className="credentials">Доступ до сторінки адміністратора</p>
                    <p className="admin">login: <span>admin</span> password: <span>admin</span></p>
                    <br/>
                    Зображення адмін парелі
                    <div className="img"><img src="img/desc_img.PNG" alt="#" /></div>
                    <p className="technology-title">Технології:</p>
                    <p className="technology">Front-end: <span>React js, Redux, Webpack, Material-ui, Less</span></p>
                    <p className="technology">Backend: <span>PHP</span></p>
                    <p className="technology-title">Контактна інформація:</p>
                    <p className="technology">E-mail: <span>andriybek@gmail.com</span></p>
                    <p className="technology">Skype: <span>systemspy123</span></p>
                    <p className="technology-title">Код:</p>
                    <p className="technology">Github: <a href="https://github.com/BekAndriy/gallery"><span>https://github.com/BekAndriy/gallery</span></a></p>
                </div>
            </div>
        );
    }
}

export default  Footer;



