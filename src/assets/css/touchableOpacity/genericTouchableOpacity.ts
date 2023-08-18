import styled from 'styled-components/native';
import { GenericTouchableOpacityPropTypes } from './genericTouchableOpacityPropTypes';

export const GenericTouchableOpacity = styled.TouchableOpacity<GenericTouchableOpacityPropTypes>`
${props => props.flex && `flex: ${props.flex};`}
${props => props.flexDirection && `flex-direction: ${props.flexDirection};`}
${props => props.margin && `margin: ${props.margin}px;`}
${props => props.marginTop && `margin-top: ${props.marginTop}px;`}
${props => props.marginRight && `margin-right: ${props.marginRight}px;`}
${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`}
${props => props.marginLeft && `margin-left: ${props.marginLeft}px;`}
${props => props.padding && `padding: ${props.padding}px;`}
${props => props.paddingTop && `padding-top: ${props.paddingTop}px;`}
${props => props.paddingRight && `padding-right: ${props.paddingRight}px;`}
${props => props.paddingBottom && `padding-bottom: ${props.paddingBottom}px;`}
${props => props.paddingLeft && `padding-left: ${props.paddingLeft}px;`}
${props => props.width && `width: ${props.width}px;`}
${props => props.height && `height: ${props.height}px;`}
${props => props.backgroundColor && `background-color: ${props.backgroundColor};`}
${props => props.borderWidth && `border-right-width: ${props.borderWidth}px; border-left-width: ${props.borderWidth}px; border-top-width: ${props.borderWidth}px; border-bottom-width: ${props.borderWidth}px;`}
${props => props.borderColor && `border-right-color: ${props.borderColor}; border-left-color: ${props.borderColor}; border-top-color: ${props.borderColor}; border-bottom-color: ${props.borderColor};`}
${props => props.borderRadius && `border-radius: ${props.borderRadius}px;`}
${props => props.center && `align-items: center; justify-content: center;`}
${props => props.flexGrow && `flex-grow: ${props.flexGrow};`}
${props => props.verticalCenter && `align-items: center;`}
${props => props.spaceBetween && `justify-content: space-between;`}
${props => props.spaceAround && `justify-content: space-around;`}
${props => props.spaceEvenly && `justify-content: space-evenly;`}
${props => props.alignSelf && `align-self: ${props.alignSelf};`}
${props => props.justifyContent && `justify-content: ${props.justifyContent};`}
${props => props.alignItems && `align-items: ${props.alignItems};`}
${props => props.borderTopWidth && `border-top-width: ${props.borderTopWidth}px;`}
${props => props.borderRightWidth && `border-right-width: ${props.borderRightWidth}px;`}
${props => props.borderBottomWidth && `border-bottom-width: ${props.borderBottomWidth}px;`}
${props => props.borderLeftWidth && `border-left-width: ${props.borderLeftWidth}px;`}
${props => props.borderTopColor && `border-top-color: ${props.borderTopColor};`}
${props => props.borderRightColor && `border-right-color: ${props.borderRightColor};`}
${props => props.borderBottomColor && `border-bottom-color: ${props.borderBottomColor};`}
${props => props.borderLeftColor && `border-left-color: ${props.borderLeftColor};`}
${props => props.borderTopLeftRadius && `border-top-left-radius: ${props.borderTopLeftRadius}px;`}
${props => props.borderTopRightRadius && `border-top-right-radius: ${props.borderTopRightRadius}px;`}
${props => props.borderBottomLeftRadius && `border-bottom-left-radius: ${props.borderBottomLeftRadius}px;`}
${props => props.borderBottomRightRadius && `border-bottom-right-radius: ${props.borderBottomRightRadius}px;`}
`;