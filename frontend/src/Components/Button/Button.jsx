import './Button.css'

function Button(props) {
    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= 50; i++) {
            const isClicked = props.clickedButtons.includes(i);
            buttons.push(
                <button
                    disabled={props.clickedButtons.length == 5 || props.surpresinha.length == 5 || isClicked}
                    key={i}
                    className={isClicked ? 'button clicked' : 'button'}
                    onClick={() => props.handleClick(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };
    

    return (
        <div className="button-container">
            {renderButtons()}
        </div>
    );
}

export default Button;