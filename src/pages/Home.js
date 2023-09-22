import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { Menus, Hasil, ListCategories, NavbarComponent } from "../components";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    //STATE
    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  //componentDidMount UNTUK MEMFILTER CATEGORI BERDASARKAN KATEGORI YANG DIPILIH
  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      // MEMANGGIL API KERANJANGS
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  // COMPONENT DID UPDATE
  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        // MEMANGGIL API SESUAI KATEGORI
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //ARROW FUNCTION changeCategory
  changeCategory = (value) => {
    this.setState({ categoriYangDipilih: value, menus: [] });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //METHOD masukKeranjang
  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          //CONST KERANJANG
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            // MEMANGGIL API SESUAI KATEGORI
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    //STATE
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
    
        //<NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              {/* //MENGOPER ARROW changeCategory &  STATE categoriYangDipilih */}
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col>
                <h4 >
                  <FontAwesomeIcon icon={faStore} />
                  <strong>
                    {" "}
                    Selamat Datang Di Yourkall Shop Selamat Berbelanja !!!{" "}
                  </strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        //Mengoper Method masukKeranjang ke Menu
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs}/>
            </Row>
          </Container>
        </div>
      
    );
  }
}
