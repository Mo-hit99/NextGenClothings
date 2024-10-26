
export function InAppNotification({ message, visible }) {
    return (
        visible && (
            <div className="notification">
                <strong>{message.sender}</strong>: {message.content || 'Sent an image'}
            </div>
        )
    );
}