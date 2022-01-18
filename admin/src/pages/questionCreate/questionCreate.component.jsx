import React from "react";

import "./questionCreate.styles.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  createQuestionStart,
  setErrorsNull,
} from "../../redux/question/question.actions";
import { selectQuestionAddError } from "../../redux/question/question.selectors";
import CustomButton from "../../components/custom-button/custom-button.component";

import ErrMessage from "../../components/errMessage/errMessage.component";
class QuestionCreatePage extends React.Component {
  constructor() {
    super();

    this.state = {
      questionType: "",
      question: "",
      title: "",
      location: "",
      image: "",
      points: 0,
      sampleInput: "",
      sampleOutput: "",
      input: null,
      inputs: "",
      correctAnswers: "",
      correctOptions: [],
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      rationale: "",
    };
  }
  componentDidMount() {
    this.props.setErrorsNull();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    var createOptions = JSON.parse(JSON.stringify(this.state));
    createOptions.sampleInput = createOptions.sampleInput.split(";");
    createOptions.sampleOutput = createOptions.sampleOutput.split(";");
    createOptions.inputs = createOptions.inputs.split(";");
    createOptions.correctAnswers = createOptions.correctAnswers.split(";");
    createOptions.option1 = this.state.option1;
    createOptions.option2 = this.state.option2;
    createOptions.option3 = this.state.option3;
    createOptions.option4 = this.state.option4;
    createOptions.input = this.state.input;
    createOptions.image = this.state.image;
    console.log(createOptions);

    this.props.createQuestionStart(createOptions);
  };
  selectImage = (event) => {
    let image = event.target.files[0];
    // let imgUrl = URL.createObjectURL(event.target.files[0]);
    // console.log(x);
    // console.log(event.target.files);

    this.setState({ [event.target.name]: image });
  };
  handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;

    if (id === "correctOptionsMcq") {
      if (value === "") {
        this.setState({ correctOptions: [] });
      } else {
        this.setState({ correctOptions: [value] });
      }
    } else if (type === "checkbox") {
      if (checked) {
        this.setState((prevState) => ({
          correctOptions: [...prevState.correctOptions, value],
        }));
      } else {
        this.setState((prevState) => ({
          correctOptions: prevState.correctOptions.filter((e) => e !== value),
        }));
      }
    } else if (id === "option1") {
      document.getElementById("option1-file").value = "";
      this.setState({ [name]: value });
    } else if (id === "option2") {
      document.getElementById("option2-file").value = "";
      this.setState({ [name]: value });
    } else if (id === "option3") {
      document.getElementById("option3-file").value = "";
      this.setState({ [name]: value });
    } else if (id === "option4") {
      document.getElementById("option4-file").value = "";
      this.setState({ [name]: value });
    } else {
      if (name === "questionType") {
        this.setState({ [name]: value, correctOptions: [] });
      } else {
        this.setState({ [name]: value });
      }
    }
  };

  handleFileChange = (e) => {
    const { name, files } = e.target;
    this.setState({
      [name]: files[0],
    });
  };

  render() {
    console.log(this.state);
    const {
      title,
      question,
      questionType,
      correctAnswers,
      sampleInput,
      inputs,
      sampleOutput,
      option1,
      option2,
      option3,
      option4,
      rationale,
    } = this.state;
    return (
      <div className="questionsCreate-container">
        <div className="title">Add a new Question.</div>
        {this.props.addError ? (
          <ErrMessage message={this.props.addError} />
        ) : (
          <br></br>
        )}
        <form onSubmit={this.handleSubmit} className="create-qn-form">
          <label htmlFor="title">Question Title: </label>
          <input
            name="title"
            value={title}
            onChange={this.handleChange}
            id="title"
            required
            className="qnCreate-form-element"
          />

          <label htmlFor="question">Enter your question: </label>
          <textarea
            name="question"
            value={question}
            onChange={this.handleChange}
            rows="8"
            cols="50"
            id="question"
            required
            className="qnCreate-form-element"
          />

          <div>
            You may also optionally upload an image to accompany the question.
          </div>
          <div>
            Image:
            <input
              type="file"
              onChange={this.selectImage}
              id="image"
              name="image"
              accept=".jpg, .jpeg .png .pdf"
              className="qnCreate-form-element"

              // accept=".py .txt"
            />
          </div>

          <label htmlFor="points">Number of points:</label>
          <input
            type="number"
            id="points"
            name="points"
            min="0"
            max="100"
            onChange={this.handleChange}
            required
            className="qnCreate-form-element"
          />

          <label htmlFor="location">Choose a Location:</label>
          <select
            name="location"
            id="location"
            onChange={this.handleChange}
            required
            className="qnCreate-form-element"
          >
            <option value="">--select a location--</option>
            <option value="Tiong Bahru Market">Tiong Bahru Market</option>
            <option value="Tiong Bahru Community Center">
              Tiong Bahru Community Center
            </option>
            <option value="Zhangde Primary School">
              Zhangde Primary School
            </option>
            <option value="Tiong Bahru Air Raid Shelter">
              Tiong Bahru Air Raid Shelter
            </option>
            <option value="Tiong Bahru Bakery">Tiong Bahru Bakery</option>
            <option value="Tiong Bahru Galicier Pastry">
              Tiong Bahru Galicier Pastry
            </option>
            <option value="Holiday Inn Singapore Atrium">
              Holiday Inn Singapore Atrium
            </option>
            <option value="SPD Headquarters">SPD Headquarters</option>
            <option value="Block 26 (Singapore Improvement Trust Flat)">
              Block 26 (Singapore Improvement Trust Flat)
            </option>
            <option value="Tiong Bahru Plaza">Tiong Bahru Plaza</option>
          </select>

          <label htmlFor="questionType">Choose a Question Type:</label>
          <select
            name="questionType"
            id="questionType"
            onChange={this.handleChange}
            required
            className="qnCreate-form-element"
          >
            <option value="">--select a question type--</option>
            <option value="mcq">MCQ</option>
            <option value="msq">MSQ</option>
            <option value="input">input</option>
            <option value="code">code</option>
          </select>

          {/* Code Question */}
          {questionType === "code" && (
            <div>
              {" "}
              <div>Please upload a file with the sample outputs.</div>
              <div>
                Sample File:
                <input
                  type="file"
                  onChange={this.handleFileChange}
                  id="inputFile"
                  name="input"
                  required
                  className="qnCreate-form-element"
                  // accept=".py .txt"
                />
              </div>
            </div>
          )}

          {/* Input Question */}

          {questionType === "input" && (
            <div className="create-qn-form">
              <label htmlFor="sampleInput">
                Enter sample inputs (seperate each sample input with a ; ) :{" "}
              </label>
              <textarea
                name="sampleInput"
                value={sampleInput}
                onChange={this.handleChange}
                rows="8"
                cols="50"
                id="sampleInput"
                className="qnCreate-form-element"
              />

              <label htmlFor="sampleOutput">
                Enter sample outputs (seperate each sample output with a ; ) :{" "}
              </label>
              <textarea
                name="sampleOutput"
                value={sampleOutput}
                onChange={this.handleChange}
                rows="8"
                cols="50"
                id="sampleOutput"
                className="qnCreate-form-element"
              />

              <label htmlFor="inputs">
                Enter the Inputs for the Question (seperate each input with a ;
                ) :{" "}
              </label>
              <textarea
                name="inputs"
                value={inputs}
                onChange={this.handleChange}
                rows="8"
                cols="50"
                id="inputs"
                required
                className="qnCreate-form-element"
              />

              <label htmlFor="correctAnswers">
                Enter the correct answers for each of the inputs (seperate each
                answer with a ; ) :{" "}
              </label>
              <textarea
                name="correctAnswers"
                value={correctAnswers}
                onChange={this.handleChange}
                rows="8"
                cols="50"
                id="correctAnswers"
                required
                className="qnCreate-form-element"
              />

              <label htmlFor="rationale">
                Enter your rationale for the solution:
              </label>
              <textarea
                name="rationale"
                value={rationale}
                onChange={this.handleChange}
                rows="8"
                cols="50"
                id="rationale"
                required
                className="qnCreate-form-element"
              />
            </div>
          )}

          {/* mcq qn */}
          {questionType === "mcq" && (
            <div>
              <label htmlFor="correctOptionsMcq">
                Choose the correct answer:
              </label>
              <select
                name="correctOptions"
                id="correctOptionsMcq"
                onChange={this.handleChange}
                required
                className="qnCreate-form-element"
              >
                <option value="">--select the correct Option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>
          )}

          {/* msq question */}
          {questionType === "msq" && (
            <div className="qnCreate-form-element">
              <div>Please select the options that are correct</div>
              <input
                onChange={this.handleChange}
                type="checkbox"
                id="option1"
                value="option1"
              />
              <label htmlFor="option1">Option 1</label>
              <br />
              <input
                onChange={this.handleChange}
                type="checkbox"
                id="option2"
                value="option2"
              />
              <label htmlFor="option2">Option 2</label>
              <br />
              <input
                onChange={this.handleChange}
                type="checkbox"
                id="option3"
                value="option3"
              />
              <label htmlFor="option3">Option 3</label>
              <br />
              <input
                onChange={this.handleChange}
                type="checkbox"
                id="option3"
                value="option4"
              />
              <label htmlFor="option4">Option 4</label>
              <br />
            </div>
          )}

          {(questionType === "mcq" || questionType === "msq") && (
            <div>
              <div>
                Please enter option 1 or upload an image to represent the option
              </div>
              <label htmlFor="option1">Option 1: </label>
              <input
                name="option1"
                value={typeof option1 === "string" ? option1 : ""}
                onChange={this.handleChange}
                id="option1"
              />

              <div>
                Option 1:
                <input
                  type="file"
                  onChange={this.selectImage}
                  id="option1-file"
                  name="option1"
                  accept=".jpg, .jpeg .png .pdf"
                  //   value={typeof option1 === "string" ? ""}
                  // accept=".py .txt"
                />
              </div>
              <div>
                {typeof option1 === "string"
                  ? option1 === ""
                    ? ""
                    : "Text Selected"
                  : "Image Selected"}
                {/* {option1.startsWith("blob")
                  ? "Image Selected"
                  : option1 === ""
                  ? ""
                  : "Text Selected"} */}
              </div>
              <br />

              <div>
                Please enter option 2 or upload an image to represent the option
              </div>
              <label htmlFor="option2">Option 2: </label>
              <input
                name="option2"
                value={typeof option2 === "string" ? option2 : ""}
                onChange={this.handleChange}
                id="option2"
              />
              <div>
                Option 2:
                <input
                  type="file"
                  onChange={this.selectImage}
                  id="option2-file"
                  name="option2"
                  accept=".jpg, .jpeg .png .pdf"
                  // accept=".py .txt"
                />
              </div>
              <div>
                {typeof option2 === "string"
                  ? option2 === ""
                    ? ""
                    : "Text Selected"
                  : "Image Selected"}
              </div>
              <br />

              <div>
                Please enter option 3 or upload an image to represent the option
              </div>
              <label htmlFor="option3">Option 3: </label>
              <input
                name="option3"
                value={typeof option3 === "string" ? option3 : ""}
                onChange={this.handleChange}
                id="option3"
              />
              <div>
                Option 3:
                <input
                  type="file"
                  onChange={this.selectImage}
                  id="option3-file"
                  name="option3"
                  accept=".jpg, .jpeg .png .pdf"
                  // accept=".py .txt"
                />
              </div>
              <div>
                {typeof option3 === "string"
                  ? option3 === ""
                    ? ""
                    : "Text Selected"
                  : "Image Selected"}
              </div>
              <br />

              <div>
                Please enter option 4 or upload an image to represent the option
              </div>
              <label htmlFor="option4">Option 4: </label>
              <input
                name="option4"
                value={typeof option4 === "string" ? option4 : ""}
                onChange={this.handleChange}
                id="option4"
              />

              <div>
                Option 4:
                <input
                  type="file"
                  onChange={this.selectImage}
                  id="option4-file"
                  name="option4"
                  accept=".jpg, .jpeg .png .pdf"
                  // accept=".py .txt"
                />
              </div>
              <div>
                {typeof option4 === "string"
                  ? option4 === ""
                    ? ""
                    : "Text Selected"
                  : "Image Selected"}
              </div>

              <label htmlFor="rationale">
                Enter your rationale for the solution:
              </label>
              <textarea
                name="rationale"
                value={rationale}
                onChange={this.handleChange}
                rows="8"
                cols="50"
                id="rationale"
                required
                style={{ marginTop: "20px" }}
                // className="qnCreate-form-element"
              />
            </div>
          )}

          <CustomButton type="submit"> Add</CustomButton>
        </form>

        <Link
          to={`/questions`}
          className="link"
          style={{ padding: "5px 30px" }}
        >
          Back to Questions
        </Link>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  addError: selectQuestionAddError,
});
const mapDispatchToProps = (dispatch) => ({
  createQuestionStart: (question) => dispatch(createQuestionStart(question)),
  setErrorsNull: () => dispatch(setErrorsNull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreatePage);
