import Colors from "./Colors"

export default {
    defaultContent: {
        fontSize: 24,
        color: Colors.defaultText,
    },

    smallContent: {
        color: Colors.defaultText,
        fontSize: 12,    
    }, 

    label: {
        fontSize: 16,
        color: Colors.labelText,
        marginBottom: 8
    },

    widgetContainer: {
        flex: 1,
        marginBottom: 16,
        backgroundColor: Colors.widgetBackground,
        paddingTop: 8,
        paddingBottom: 16,
        borderWidth: 1,
        borderTopColor: Colors.defaultBorder,
        borderBottomColor: Colors.defaultBorder    
    }
}