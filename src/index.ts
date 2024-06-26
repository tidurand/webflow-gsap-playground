/* eslint-disable no-console */
import gsap from 'gsap'

import {
  control_animation,
  from_animation,
  fromTo_animation,
  parameters_animation,
  timeline_animation,
  tl_parameters_animation,
  to_animation,
} from './animations'
import { createScrollAnimations } from './scroll_animations'
import { playAnimation, selectButton } from './utils'

window.Webflow ||= []
window.Webflow.push(() => {
  const animations = {
    '#play_to': to_animation,
    '#play_from': from_animation,
    '#play_fromTo': fromTo_animation,
    '#play_parameters': parameters_animation,
    '#play_timeline': timeline_animation(),
    '#play_tl_parameters': tl_parameters_animation(),
  }

  const control_animations = {
    '#control_play': () => control_animation.play(),
    '#control_pause': () => control_animation.pause(),
    '#control_resume': () => control_animation.resume(),
    '#control_reverse': () => control_animation.reverse(),
    '#control_restart': () => control_animation.restart(),
  }

  //Set Listeners
  Object.keys(animations).forEach((id) => {
    const key = id as keyof typeof animations

    selectButton(key).addEventListener('click', () =>
      playAnimation(animations[key]),
    )
  })

  //Set Control Listeners
  Object.keys(control_animations).forEach((id) => {
    const key = id as keyof typeof control_animations

    selectButton(id).addEventListener('click', control_animations[key])
  })

  //Set Play Button Hover Animation
  const buttons = document.querySelectorAll('.button_play')

  buttons.forEach((button) => {
    const play_animation = gsap.to(button, {
      backgroundImage:
        'radial-gradient(circle, rgba(255,255,255) 50%, rgba(116,116,116) 90%)',
      duration: 1,
      ease: 'power2.out',
      paused: true,
    })
    button.addEventListener('mouseenter', () => play_animation.play())
    button.addEventListener('mouseleave', () =>
      play_animation.reverse().duration(0.5),
    )
  })

  createScrollAnimations()
})
