import axios from "axios";
import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faList,
  faIceCream,
  faPizzaSlice,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";

//ICON DAFTAR KATEGORI
const Icon = ({ nama }) => {
  if (nama === "Makanan") {
    return <FontAwesomeIcon icon={faPizzaSlice} className="mr-2" />;
  }
  if (nama === "Minuman") {
    return <FontAwesomeIcon icon={faCoffee} />;
  }
  if (nama === "Cemilan") {
    return <FontAwesomeIcon icon={faCookieBite} className="mr-2" />;
  }
  if (nama === "Eskrim") {
    return <FontAwesomeIcon icon={faIceCream} className="mr-2" />;
  }
  return <FontAwesomeIcon icon={faPizzaSlice} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    //PROPS
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md="2" mt="2">
        <h4>
          <strong> Kategori Menu </strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  categoriYangDipilih === category.nama && "category-active"
                }
                style={{ cursor: "pointer" }}
              >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
