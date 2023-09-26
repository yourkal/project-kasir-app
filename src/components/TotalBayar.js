import {
  faDollar,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";


export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) => {
      const pesanan = {
        total_bayar: totalBayar,
        menus: this.props.keranjangs
      }

      axios.post(API_URL + "pesanans", pesanan).then((res) => {
        this.props.history.push("/Sukses")
      })
  }
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
      {/* web */}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Bayar :
              <strong className="float-right mr-2">
                Rp.{" "}
                {totalBayar.toLocaleString("id-ID", {
                  styles: "currency",
                  currency: "USD",
                })}
              </strong>
            </h4>
            <Button variaant="primary" 
            className="mb-2 mt-1 mr-2" 
            size="lg"
            onClick={ () => this.submitTotalBayar(totalBayar) }
            >
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
              <strong> SILAHKAN BAYAR </strong>
            </Button>
          </Col>
        </Row>
      </div>

      {/* mobile */}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Bayar :
              <strong className="float-right mr-2">
                Rp.{" "}
                {totalBayar.toLocaleString("id-ID", {
                  styles: "currency",
                  currency: "USD",
                })}
              </strong>
            </h4>
            <Button variaant="primary" 
            className="mb-2 mt-1 mr-2" 
            size="lg"
            onClick={ () => this.submitTotalBayar(totalBayar) }
            >
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
              <strong> SILAHKAN BAYAR </strong>
            </Button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
