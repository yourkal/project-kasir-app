import { faDollar, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default class TotalBayar extends Component {
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
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
            <Button variaant="primary" className="mb-2 mt-1 mr-2" size="lg">
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
                <strong> SILAHKAN BAYAR </strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
