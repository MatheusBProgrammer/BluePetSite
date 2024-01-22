import React, { useState } from "react";
import styles from "./NavbarDropDownMenu.module.css";
import { Link } from "react-router-dom";

function NavbarDropDownMenu({ object }) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div
      className={styles.navbarDropDown}
      onClick={() => setShowSubMenu(!showSubMenu)}
    >
      {!showSubMenu && (
        <div>
          {object.name} <span>&nbsp;&nbsp;&nbsp;&#9660;</span>
        </div>
      )}
      {showSubMenu && (
        <>
          {object.name} <span>&nbsp;&nbsp;&nbsp;&#9650;</span>
          <div className={styles.dropdownContent}>
            {object.links.map((item, index) => (
              <Link to={item.to} key={index}>
                {item.nameSession}{" "}
                {item.icon && <span>&nbsp;&nbsp;{item.icon}</span>}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NavbarDropDownMenu;
