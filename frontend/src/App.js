import React from "react";
import {
  Container,
  Button,
  ButtonGroup,
  Select,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import Image from "material-ui-image";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import "./App.css";
// eslint-disable-next-line
const nextPage = {
  backgroundColor: "black",
};
// eslint-disable-next-line
const newPage = {
  backgroundColor: "red",
};


const apiURL = "http://localhost:5000";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 1,
      currentFileName: "",
      data: [],
      selectedPdfName: "",
      selectedPdfPages: 0,
    };
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangePDF = this.handleChangePDF.bind(this);
    this.setNewPage = this.setNewPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
  }

  componentDidMount() {
    axios
      .get(apiURL+'/pdfs')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    document.addEventListener("keypress", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress, false);
  }

  goToPrevPage() {
    const { currentIndex, selectedPdfPages } = this.state;
    if (selectedPdfPages > 0) {
      const newPointer = currentIndex === 1 ? 1 : currentIndex - 1;
      this.setState({ currentIndex: newPointer });
    }
  }

  goToNextPage() {
    const { currentIndex, selectedPdfPages } = this.state;
    if (selectedPdfPages > 0) {
      const newPointer =
        currentIndex === selectedPdfPages - 1
          ? selectedPdfPages - 1
          : currentIndex + 1;
      this.setState({ currentIndex: newPointer });
    }
  }

  setNextPage() {
    if (this.state.selectedPdfName !== "") {
      let originalData = this.state.data;
      originalData[this.state.selectedPdfName]['pages'][
        this.state.currentIndex + 1
      ] = 0;
      this.setState({ data: originalData });
      this.goToNextPage();
    }
  }

  setNewPage() {
    if (this.state.selectedPdfName !== "") {
      let originalData = this.state.data;
      originalData[this.state.selectedPdfName]['pages'][
        this.state.currentIndex +1 
      ] = 1;
      this.setState({ data: originalData });
      this.goToNextPage();
        
    }
  }

  handleKeyPress(e) {
    switch (e.key) {
      case "n":
        this.goToNextPage();
        break;

      case "p":
        this.goToPrevPage();
        break;

      case "0":
        this.setNextPage();
        break;

      case "1":
        this.setNewPage();
        break;

      default:
        break;
    }
  }

  handleChangePDF(e) {
    const value = e.target.value;
    this.setState({
      selectedPdfName: value,
      selectedPdfPages: Object.keys(this.state.data[value].pages).length,
      currentIndex: 1 
    });
  }

  render() {
    let { data, selectedPdfName } = this.state;

    const files = Object.keys(data);
    return (
      <div>
        <Container>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            xs={12}
          >
            <Grid item align="center" xs={12}>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h3"
                align="center"
              >
                Fastagger
              </Typography>
            </Grid>
            <Grid item align="center" xs={12}>
              <FormControl style={{ minWidth: 300 }}>
                <InputLabel>Target Pdf</InputLabel>
                <Select
                  labelId="pdfs"
                  id="pdfSelect"
                  value={this.state.selectedPdfName}
                  onChange={this.handleChangePDF}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {files.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {selectedPdfName!==''? (
            <Grid align="center" item xs={12}>
              Page {this.state.currentIndex + 1} / {this.state.selectedPdfPages}
            </Grid>
            ): null}
            <Grid align="center" item xs={12} space={5}>
              <ButtonGroup variant="contained">
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#ff9f1c",
                  }}
                  onClick={this.goToPrevPage}
                >
                  Previous (p)
                </Button>
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#2ec4b6",
                  }}
                  onClick={this.goToNextPage}
                >
                  Next (n)
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid align="center" item xs={12}>
              <ButtonGroup variant="contained">
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#88b35d",
                  }}
                  onClick={this.setNextPage}
                >
                  Same Document (0)
                </Button>
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#f25f5c",
                  }}
                  onClick={this.setNewPage}
                >
                  New Document (1)
                </Button>
              </ButtonGroup>
            </Grid>
            {this.state.selectedPdfName!=='' ? (<Grid container>
            <Grid item xs={6}>
              <div style={{backgroundColor: data[this.state.selectedPdfName]['pages'][
                  this.state.currentIndex] === 0 ? 'black' : 'red' }}>_</div>
              <Image
                src={`${apiURL}/static/pdfs/${selectedPdfName}/${selectedPdfName}_${this.state.currentIndex}.png`}
                alt="something"
                style={{ width: "600px", height: "300px"}}
              />
            </Grid>
            <Grid item xs={6}>
            <div style={{backgroundColor: data[this.state.selectedPdfName]['pages'][
                  this.state.currentIndex + 1] === 0 ? 'black' : 'red' }}>_</div>

              <Image
                src={`${apiURL}/static/pdfs/${selectedPdfName}/${selectedPdfName}_${this.state.currentIndex+1}.png`}
                alt="something"
                style={{ width: "600px", height: "300px"}}
              />
            </Grid>
            </Grid>
            ) : null};
            <Grid align="center" item xs={12}>
              <ButtonGroup variant="contained">
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#007f5f",
                  }}
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(data)
                  )}`}
                  download="filename.json"
                >
                  Save
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
