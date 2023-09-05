import * as THREE from 'three'
import { proxy } from 'valtio'

export const damp = THREE.MathUtils.damp
export const state = proxy({
  clicked: null,
  urls: [
    {
        url: '/portfolio/Honeymoon/cover.mp4',
        folder: 'Honeymoon',
        items: [
            'cover.mp4'
        ],
        title: 'Summer Blends',
        description: 'Animations based off of a recent vacation in the US.',
        scale: [1, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/WorkStation/cover.mp4',
        folder: 'WorkStation',
        items: [
            'cover.mp4',
            'sideview.jpg',
            'view1.jpg',
            'view2.jpg',
            'view3.jpg'
        ],
        title: 'My Workstation',
        description: 'Modelled my workstation that evolved over the pandemic.',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/CafeLeblanc/cover.jpg',
        folder: 'CafeLeblanc',
        items: [
            'cover.jpg',
            'render-clay.jpg',
            'render-side.jpg'
        ],
        title: 'Cafe Leblanc',
        description: 'Made a realistic isometric render of Cafe Leblanc from Persona 5.',
        scale: [0.8, 1],
        scaleMobile: 0.5
    },
    {
        url: '/portfolio/RookiePrints/cover.jpg',
        folder: 'RookiePrints',
        items:[
            'cover.jpg',
            '01-cup-noodles-v2.jpg',
            '02-asahi.jpg',
            '03-pocky.jpg',
            '04-onigiri.jpg',
            '06-banana-milk.jpg',
            '07-hk-noods.jpg',
            '09-green-tea.jpg'
        ],
        title: 'Konbini Army',
        description: 'A bunch of prints I made for a postcard set based on convenience store items!',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/E9S/cover.mp4',
        folder: 'E9S',
        items:[
            'cover.mp4'
        ],
        title: 'FFXIV Gameboard',
        description: 'An FF14 raid strategy based off of Endwalker promotional material, and my first (and only) viral video!',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/PcRender/cover.mp4',
        folder: 'PcRender', 
        items:[
            'cover.mp4',
            '03312021-pc-sideview.jpg',
            '03312021-pc-sideview-zoom1.jpg',
            '03312021-pc-sideview-zoom2.jpg',
            '03312021-pc-sideview-zoom3.jpg'
        ],
        title: 'My Tower',
        description: 'A render of my current PC setup in celebration of me getting a 3060.',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Vantage/cover.jpg',
        folder: 'Vantage',
        items: [
            'cover.jpg',
            'side-1.jpg',
            'side-2.jpg',
            'side-3.jpg',
            'side-4.jpg',
        ],
        title: 'Apartment Design',
        description: 'Made a rough render to plan out my future home with my wife!',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Maps/cover.jpg',
        folder: 'Maps',
        items:[
            'cover.jpg',
            '02222021-ncr-old-map-square.jpg',
            '03022021-soil-malaysia.jpg',
            'cover1.jpg',
            '03082021-thai-soilmap.jpg',
            '03162021-nitrogen-dioxide-v2.jpg',
            '04122021-ncr-pop-grid.jpg',
            '04122021-ncr-pop-grid-2.jpg',
        ],
        title: 'Maps',
        description: 'A bunch of maps created using satellite imagery and geospatial data.',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Mandalorian/cover.jpg',
        folder: 'Mandalorian',
        items:[
            'cover.jpg',
            '01242021-mandomask-256.jpg',
            '01252021-thearmorer-v2.jpg',
            '01262021.jpg',
            '01282021-fetts.jpg',
            '01-27-2021-niteowls-v3.jpg',
            '01292021-allhelmets-v5.jpg'
        ],
        title: 'Mandalorians',
        description: 'Obsessed with the Mandalorian helmet designs from the Mandalorian.',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Kodawari/cover.mp4',
        folder: 'Kodawari', 
        items:[
            'cover.mp4',
            '01212021-side.jpg',
            '01212021-top.jpg'
        ],
        title: 'Kodawari',
        description: 'Just some creative renders from my favorite gyudon place, Kodawari!',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Satisfying/cover.mp4',
        folder: 'Satisfying',
        items:[
            'cover.mp4',
            'roll3.mp4',
            'jump2.mp4'
        ],
        title: 'Satisfying Animations',
        description: 'Trying my hand at some satisfying animations.',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Sharleyan/cover.mp4',
        folder: 'Sharleyan',
        items:[
            'cover.mp4'
        ],
        title: 'Sharleyan',
        description: "A snowglobe render of FFXIV Endwalker's new city: Sharleyan.",
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/AnnivProject/cover.jpg',
        folder: 'AnnivProject',
        items:[
            'cover.jpg',
            'cover1.jpg',
            'cover2.jpg',
            'Island1.jpg',
            'Island2.jpg',
            'Island3.jpg',
            'Island6.jpg',
        ],
        title: 'Anniversary Project',
        description: 'Renders of some of iconic locations with my wife done for my proposal!',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/Torb/cover.mp4',
        folder: 'Torb',
        items:[
            'cover.mp4',
            '04242021-torb-turret.jpg'
        ],
        title: 'Torb Turret',
        description: 'Practicing non-human IK rigging with Torb.',
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    {
        url: '/portfolio/SeventhHeaven/cover.mp4',
        folder: 'SeventhHeaven', 
        items:[
            'cover.mp4',
            'seventh-heaven-1F-v8.jpg',
            'seventh-heaven-B1-v3.jpg',
            'aerith-house-4.jpg', 
            'aerith-house-scene1-1.jpg',
            'aerith-house-scene1-2.jpg'
        ],
        title: 'FF7 Seventh Heaven',
        description: "One of my earliest projects -- the iconic FF7 bar, secret base and Aerith's house.",
        scale: [0.8, 1],
        scaleMobile: 0.1
    },
    ]
})