import React  from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, Icon } from "@mui/material";
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from "react-redux";
import {addList, addCard} from "../actions";



class TrelloActonButton extends React.Component {

    state = {
        formOpen: false
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }

    closeForm = e => {
        this.setState({
            formOpen: false
        })
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState ({
                text: ""
            })
            dispatch(addList(text))
        }

        return;


    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState ({
                text: ""
            })
            dispatch(addCard(listID, text))
        }

        return;
    }

    renderAddButton = () => {
        const { list } = this.props;
        console.log(list);
        const buttonText = list ? "Add another card" : "Add another list";
        const buttonTextOpacity = !list ? 1 : 0.5;
        const buttonTextColor = !list ? "white" : "inherit";
        const buttonTextBackground = !list ? "rgba(0,0,0,.15)" : "inherit";


        return (
            <div onClick={this.openForm} 
            style={{...styles.openForButtonGroup, opacity: buttonTextOpacity, color: buttonTextColor, backgroundColor:buttonTextBackground}}>
                <AddIcon></AddIcon>
                <p>{buttonText}</p>
            </div>
        );
    };

    renderForm = () => {
        const {list} = this.props;
        const placeholder = list ? "Enter a title for this card..." : "Enter list title...";
        const buttonTitle = list ? "Add Card" : "Add List";
        //npm install react-textarea-autosize
        return (
        <div>
            <Card style={{overflow:"visible", minHeight:80, minWidth:272, padding:"6px 8px 2px"}}>
            <TextareaAutosize 
            placeholder={placeholder}
            autoFocus 
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={{
                resize: "none",
                width: "100%",
                overflow: "hidden",
                outline: "none",
                border: "none"
            }}/>

            </Card>
            <div style={styles.formButtonGroup}>
                <Button onMouseDown={ list ? this.handleAddCard : this.handleAddList}
                 variant="contained" 
                 style={{color:"white", backgroundColor:"#5aac44", width:"248px"}}>
                    {buttonTitle} {" "}
                </Button>
                <Icon style={{marginLeft: 8, cursor:"pointer"}}>close</Icon>
            </div>
        </div>)
    }

    render() {
        return this.state.formOpen ?  this.renderForm() : this.renderAddButton() 
    }
}

const styles = {
   
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        widht: 272,
        paddingLeft:10,
        minWidth: 248,
    },

    formButtonGroup:{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        width:248
    }
}

export default connect() (TrelloActonButton);