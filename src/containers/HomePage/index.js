import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className="main-container">
      <div style={{ marginLeft: "15%", marginTop: "7%" }}>
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: "#d74742",
            marginBottom: "5%",
            fontWeight: "bold",
            // fontStyle: "italic",
          }}
        >
          'Your limitation is only your IMAGINATION'
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="./images/group.jpg" style={{ width: "750px" }} />

          <Card
            className={classes.root}
            style={{
              width: "400px",
              marginLeft: "5%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Typography>
                <h5
                  style={{
                    color: "#d74742",
                    marginBottom: "1%",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Before using this admin page,
                </h5>
              </Typography>
            </CardContent>

            <CardContent>
              <Typography
                variant="body2"
                component="p"
                style={{
                  display: "flex",
                  textAlign: "left",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                1. You should check "Require authentication to join: Sign in to
                Zoom" by Security category on your Zoom setting page. See Below.
              </Typography>
            </CardContent>

            <img src="./images/howto2.png" style={{ width: "100%" }} />
            <CardContent>
              <Typography
                variant="body2"
                component="p"
                style={{
                  display: "flex",
                  textAlign: "left",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                2. Make sure to add Zoom Id for each student, when you register
                them on our admin page.
                <br /> <br />
                3. Please add the Zoom meeting Id on the Cohort page. Please do
                not change the Zoom meeting ID once it has been made.
                <br /> <br />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
