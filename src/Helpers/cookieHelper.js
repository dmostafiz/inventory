import Cookies from 'js-cookie'
import Axios from './Axios'

export function setRedirectUrl(url) {
    Cookies.set('redirectUrl', url)
    console.log('Set Redirect URL: ', url)
}


export function getRedirectUrl() {
    const redirectUrl = Cookies.get('redirectUrl')
    Cookies.remove('redirectUrl')

    console.log('Get & remove Redirect URL: ', redirectUrl)

    return redirectUrl || '/'
}

export function setAccessToken(token) {
    console.log('Access Token Saved: ', token)
    Cookies.set('accessToken', token)
}

export function getAccessToken() {
    console.log('get accessToken')
    return Cookies.get('accessToken') || null
}

export function removeAccessToken() {
    console.log('Access Token Removed')
    Cookies.remove('accessToken')
}


export function setFlashMessage(type, title = '', msg = '') {
    console.log('Set flash msg: ', msg)
    Cookies.set('flashMessage', JSON.stringify({ type, title, msg }))
}

export function getFlashMessage() {
    const fls =  Cookies.get('flashMessage') ? JSON.parse(Cookies.get('flashMessage')) : null

    console.log('Get Flash Message ', fls)
    Cookies.remove('flashMessage')

    return fls
}