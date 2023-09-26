import React, { Component } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Card, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    //STATE
    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  //METHOD ARROW FUNCTION
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  //KETERANGAN
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handlerSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan!",
          text:
            "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-2">
        <h4>
          <FontAwesomeIcon icon={faShoppingCart} />
          <strong> Pesanan </strong>
        </h4>
        <hr />
        {/* //CHECK DAN MAPPING DATA KERANJANG */}
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
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

              {/* IMPORT METHOD MODALKERANJANG */}
              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handlerSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
