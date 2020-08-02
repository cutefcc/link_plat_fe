import React from "react";
import PropTypes from "prop-types";
class Con extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("数据=====", this.props.subjects);
    return (
      <div>
        <div>name: {this.props.name}</div>
        <div>age: {this.props.age}</div>
        <div>电脑size: {this.props.size}</div>
        {this.props.subjects.map((item, index) => {
          return (
            <div
              style={{
                width: "800px",
                height: "200px",
                border: "1px solid #f00",
                marginBottom: "20px",
                display: 'flex'
              }}
              key={item.title}
            >
                <div>{index}</div>
                <div><img src={item.images.small} /></div>
                <div>{item.title}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
Con.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};
Con.defaultProps = {
  subjects: [],
};

export default Con;
