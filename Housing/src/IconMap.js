import R from 'ramda'

iconMap = (amenity) => {
    if(R.match('Court',amenity)[0] || amenity=='Football Field'
     || amenity=='Skating Rink' || amenity=='Cricket Pitch' || amenity=='Golf Course'){
        return require('../assets/icons/icon-all_sports.png')
    }
    switch(amenity){
        case 'Children\'s Play Area':
        case 'Children Play Area':
            return require('../assets/icons/icon-kids-play-area.png')
        case 'Gymnasium':
            return require('../assets/icons/icon-gym.png')
        case 'ac':
            return require('../assets/icons/icon-ac.png')
        case 'ATM':
            return require('../assets/icons/icon-ATM.png')
        case 'washing machine area':
            return require('../assets/icons/icon-washing-machine.png')
        case 'Lift':
        case 'Service Lift':
            return require('../assets/icons/icon-lift.png')
        case 'Gated Community':
        case 'Security Guards':
        case '24x7 Security':
            return require('../assets/icons/icon-overall_security.png')
        case 'Swimming Pool':
            return require('../assets/icons/icon-swimming.png')
        case 'cupboards':
            return require('../assets/icons/icon-cuboard.png')
        case 'vastu compliant':
            return require('../assets/icons/icon-vastu.png')
        case 'gas line':
            return require('../assets/icons/icon-gas-pipeline.png')
        case 'Internet / Wi-Fi':
            return require('../assets/icons/icon-network.png')
        case 'intercom':
            return require('../assets/icons/icon-intercom.png')
        case 'Internal Roads':
            return require('../assets/icons/icon-good-infrastructure.png')
        case 'Yoga Room':
            return require('../assets/icons/icon-np-yoga.png')
        case 'parking':
            return require('../assets/icons/icon-parking.png')
        default:
            return require('../assets/icons/icon-bed.png')
        
    }
}

export default maptoIcon = (list) => (
    list.map( amenity => iconMap(amenity))
)