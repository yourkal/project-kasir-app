import React from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

//MENGAMBIL OPERAN masukKeranjang dari props app.js
const Menus = ({ menu, masukKeranjang }) => {
  return (
    //CARD MENAMPILKAN MENU
    <Col md={4} xs={6} className="mb-5 ">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            <strong>{menu.nama}</strong>
          </Card.Title>
            <p/>
          <Card.Text>{menu.deskripsi}</Card.Text>
          <p/>
          <Card.Text>
            {/* Rp. {menu.harga} */}
            <b>
              Rp.{" "}
              {menu.harga.toLocaleString("id-ID", {
                styles: "currency",
                currency: "USD",
              })}
            </b>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
