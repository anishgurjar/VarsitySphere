import React from 'react'
import { View, Text } from 'react-native'

import {connect} from 'react-redux'


function Profile(){
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)