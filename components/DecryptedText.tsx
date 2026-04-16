"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface DecryptedTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%&*+_?"

export default function DecryptedText({
  text,
  speed = 40,
  delay = 0,
  className = "",
  as: Component = "span",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypted, setIsDecrypted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const decrypt = useCallback(() => {
    let iteration = 0
    let interval: NodeJS.Timeout

    const startDecrypt = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              if (char === " ") return " "
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          setIsDecrypted(true)
        }

        iteration += 1 / 3 // Slowly resolve characters
      }, speed)
    }

    if (delay > 0) {
      const timeout = setTimeout(startDecrypt, delay)
      return () => {
        clearTimeout(timeout)
        clearInterval(interval)
      }
    } else {
      startDecrypt()
      return () => clearInterval(interval)
    }
  }, [text, speed, delay])

  useEffect(() => {
    if (isInView) {
      const cleanup = decrypt()
      return cleanup
    }
  }, [isInView, decrypt])

  return (
    <Component ref={ref} className={`${className} font-mono`}>
      {displayText || text.split("").map(() => " ")}
    </Component>
  )
}
