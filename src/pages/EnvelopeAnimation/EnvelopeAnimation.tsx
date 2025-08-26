import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import sequenceConfig from "./animation.json"
import "./EnvelopeAnimation.scss"

import envelopeClosed from "../../assets/images/envelop.png"
import envelopeOpen from "../../assets/images/envelop.png"
import mixerImg from "../../assets/images/Claro 3 JAR 1.svg"
import rewardImg from "../../assets/images/Voucher 1.png"

export default function EnvelopeAnimation() {
  const [envelopeOpenState, setEnvelopeOpenState] = useState(false)
  const [showMixer, setShowMixer] = useState(false)
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    sequenceConfig?.animationSequence.forEach((step: any) => {
      timers.push(
        setTimeout(() => {
          if (step.target === "envelope" && step.properties.status === "open") {
            setEnvelopeOpenState(true)
          }
          if (step.target === "mixer" && step.action === "animateIn") {
            setShowMixer(true)
          }
          if (step.target === "reward_bundle" && step.action === "animateIn") {
            setShowReward(true)
          }
        }, step.time)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="envelope-container"
      style={{
        backgroundImage: `url(${envelopeOpenState ? envelopeOpen : envelopeClosed})`,
      }}
    >
      {/* Items over envelope */}
      {showMixer && (
        <motion.img
          src={mixerImg}
          alt="Mixer"
          className="item mixer"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      {showReward && (
        <motion.img
          src={rewardImg}
          alt="Reward"
          className="item reward"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  )
}
