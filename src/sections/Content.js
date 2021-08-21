import officeImage from "../images/office.png";

export default function Content() {
  return (
    <div className="content">
      <div className="section main">
        <h1>Quam Tristique Condimentum</h1>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. <em>Curabitur blandit</em>{" "}
          tempus porttitor. Integer posuere erat a ante venenatis dapibus
          posuere velit aliquet. Vestibulum id ligula porta felis euismod
          semper.
        </p>
      </div>
      <div className="section">
        <div className="content-image-box">
          <div className="wrapper">
            <div className="content-box">
              <h2>Fringilla Euismod Adipiscing Ipsum</h2>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Maecenas faucibus mollis interdum.
                Aenean lacinia bibendum nulla sed.
              </p>
            </div>
            <div className="image-box">
              <img src={officeImage} alt="office" />
            </div>
          </div>
        </div>
        <ul className="points">
          <li>Tellus Ullamcorper Inceptos</li>
          <li>Magna Condimentum</li>
          <ul className="sublist">
            <li>Mattis Tristique</li>
            <li>Pharetra Pellentesque Dapibus</li>
          </ul>
          <li>Aenean Inceptos</li>
          <li>Parturient Bibendum</li>
        </ul>
      </div>
    </div>
  );
}
