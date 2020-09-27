import React from "react";
import { suppliers_list_headers } from "../../constants";
import { Loading } from "../../Loading";
import { EmptyState } from "../../Products/EmptyState";
import { get_supplier } from "../../services";
import DataCard from "./DataCard";
import Select from "react-select";
import { createOptionForReactSelect } from "../../utils";
import SupplierInfoModal from "./SupplierInfoModal";

export default class SuppliersListView extends React.Component {
  state = {
    suppliers: [],
    loading: true,
    showModal: false,
    data: {},
  };

  getSuppliers = async () => {
    let res = await get_supplier();
    this.setState({
      suppliers: res.data,
      loading: false,
    });
  };

  render_table_headers = () => {
    return suppliers_list_headers.map((ins, index) => {
      const { label, flex } = ins;
      return (
        <div key={`th-${index}`} className="p-3-0" style={{ flex: flex }}>
          {label}
        </div>
      );
    });
  };

  componentDidMount = async () => {
    this.getSuppliers();
  };

  handleChange = (value) => {
    if (value) this.setState({ showModal: true, data: value });
  };

  render() {
    const { suppliers, loading, data, showModal } = this.state;
    if (loading) return <Loading />;

    return (
      <div>
        {!!showModal && (
          <SupplierInfoModal
            onHide={() => this.setState({ showModal: false })}
            data={data}
          />
        )}

        <div style={{ float: "right", width: "40%" }}>
          <Select
            className="basic-single"
            placeholder={"Seach Suppliers"}
            classNamePrefix="select"
            defaultValue={null}
            isClearable={true}
            isSearchable={true}
            name="color"
            onChange={this.handleChange}
            options={createOptionForReactSelect(suppliers)}
          />
        </div>
        <br />
        <br />
        {suppliers.length ? (
          <>
            <div className="display-flex table-header">
              {this.render_table_headers()}
            </div>
            <div className="table-body">
              {suppliers.map((obj, index) => (
                <DataCard data={obj} key={index} index={index} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState message="No Suppliers have signed up yet :(" />
        )}
      </div>
    );
  }
}
