import React, { Component } from 'react'
import {  faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";


export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props
    return (
      <Col md={3} mt="2">
       <h4>
          <FontAwesomeIcon icon={faShoppingCart} />
          <strong> Pesanan </strong>
        </h4>
        <hr />
         {/* //CHECK DAN MAPPING DATA KERANJANG */}
         {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item>
                <Row>
                  <Col xs={2}>
                    <h4>
                      {/* IMPORT BADGE DARI REACT BOOTSTRAP */}
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>

                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>
                      Rp.{" "}
                      {menuKeranjang.product.harga.toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </Col>
                  
                  <Col>
                    <strong className="float-right">
                      Rp.{" "}
                      {menuKeranjang.total_harga.toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
           )}
      </Col>
    )
  }
}
