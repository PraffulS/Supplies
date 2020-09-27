import React from "react";
import { products_list_headers } from "../../constants";
import { Loading } from "../../Loading";
import DataCard from "../../Products/DataCard";
import { EmptyState } from "../../Products/EmptyState";
import { get_all_products } from "../../services";
import Select from "react-select";
import { createOptionForReactSelect } from "../../utils";

export default class ProductsListNewView extends React.Component {
  state = {
    products: [],
    loading: true,
    showModal: false,
    filterId: null,
  };

  getProducts = async () => {
    let res = await get_all_products();
    this.setState({
      products: res.data,
      loading: false,
    });
  };

  render_table_headers = () => {
    return products_list_headers.map((ins, index) => {
      const { label, flex } = ins;
      return (
        <div key={`th-${index}`} className="p-3-0" style={{ flex: flex }}>
          {label}
        </div>
      );
    });
  };

  componentDidMount = async () => {
    this.getProducts();
  };

  handleChange = (value) => {
    this.setState({ filterId: value ? value.id : null });
  };

  render() {
    const { products, loading, filterId } = this.state;
    if (loading) return <Loading />;

    return (
      <div>
        <div style={{ float: "right", width: "40%" }}>
          <Select
            className="basic-single"
            placeholder={"Seach Products"}
            classNamePrefix="select"
            defaultValue={null}
            isClearable={true}
            isSearchable={true}
            name="color"
            onChange={this.handleChange}
            options={createOptionForReactSelect(products, "name")}
          />
        </div>{" "}
        <br />
        <br />
        {products.length ? (
          <>
            <div className="display-flex table-header">
              {this.render_table_headers()}
            </div>
            <div className="table-body">
              {(filterId
                ? products.filter(({ id }) => id === filterId)
                : products
              ).map((obj, index) => (
                <DataCard
                  data={obj}
                  key={index}
                  index={index}
                  viewOnly={true}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }
}
