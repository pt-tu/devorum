'use client'
import { Avatar, Button } from '@nextui-org/react'
import type {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng/esm'

import {
  VERSION,
  createClient,
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
  onCameraChanged,
  onMicrophoneChanged,
} from 'agora-rtc-sdk-ng/esm'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IoCallOutline } from 'react-icons/io5'
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci'
import { TbVideo, TbVideoOff } from 'react-icons/tb'
import configs from '@/configs/configs'
import classNames from 'classnames'

console.log('Current SDK VERSION: ', VERSION)

onCameraChanged((device) => {
  console.log('onCameraChanged: ', device)
})
onMicrophoneChanged((device) => {
  console.log('onMicrophoneChanged: ', device)
})

const client: IAgoraRTCClient = createClient({
  mode: 'rtc',
  codec: 'vp8',
})
let audioTrack: IMicrophoneAudioTrack
let videoTrack: ICameraVideoTrack

type Props = {
  channel: string
  avatar?: string
  allowVideo?: boolean
  allowEndCall?: boolean
  askToJoin?: boolean
}

const Call = ({ channel, avatar, allowEndCall = true, allowVideo = true, askToJoin = false }: Props) => {
  const [isAudioOn, setIsAudioOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioPubed, setIsAudioPubed] = useState(false)
  const [isVideoPubed, setIsVideoPubed] = useState(false)
  const [isVideoSubed, setIsVideoSubed] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const turnOnCamera = async (flag?: boolean) => {
    flag = flag ?? !isVideoOn
    setIsVideoOn(flag)

    if (videoTrack) {
      return videoTrack.setEnabled(flag)
    }
    videoTrack = await createCameraVideoTrack()
    videoTrack.play('camera-video')
  }

  const turnOnMicrophone = useCallback(async (flag: boolean) => {
    setIsAudioOn(flag)

    if (audioTrack) {
      audioTrack.setEnabled(flag)
      return
    }

    audioTrack = await createMicrophoneAudioTrack()
    // audioTrack.play();
  }, [])

  const joinChannel = useCallback(
    async (isJoined: boolean) => {
      if (isJoined) {
        await leaveChannel()
      }

      client.on('user-published', onUserPublish)

      await client.join(configs.AGORA_APP_ID, channel, null, null)
      setIsJoined((prev) => !prev)
    },
    [channel],
  )

  const publishAudio = useCallback(async () => {
    await turnOnMicrophone(true)

    await client.publish(audioTrack)
    setIsAudioPubed(true)
  }, [turnOnMicrophone])

  const publishVideo = useCallback(async () => {
    await turnOnCamera(true)

    await client.publish(videoTrack)
    setIsVideoPubed(true)
  }, [turnOnCamera])

  const joinAudio = useCallback(async () => {
    if (client.connectionState === 'DISCONNECTED') {
      await joinChannel(false)
      publishAudio()
      if (allowVideo) {
        publishVideo()
      }
    }
  }, [allowVideo, joinChannel, publishAudio, publishVideo])

  useEffect(() => {
    if (!askToJoin) {
      joinAudio()
    }
  }, [askToJoin, joinAudio])

  const leaveChannel = async () => {
    setIsJoined(false)
    setIsAudioPubed(false)
    setIsVideoPubed(false)

    await client.leave()
  }

  const onUserPublish = async (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
    if (mediaType === 'video') {
      const remoteTrack = await client.subscribe(user, mediaType)
      remoteTrack.play('remote-video')
      setIsVideoSubed(true)
    }
    if (mediaType === 'audio') {
      console.log('user published audio')
      const remoteTrack = await client.subscribe(user, mediaType)
      remoteTrack.play()
    }
  }

  const endCall = () => {
    if (askToJoin) {
      leaveChannel()
    } else {
      window.close()
    }
  }

  useEffect(() => {
    const closeChannel = () => {
      leaveChannel()
    }
    window.addEventListener('beforeunload', closeChannel)
    return () => {
      window.removeEventListener('beforeunload', closeChannel)
    }
  }, [])

  return (
    <>
      {!isAudioPubed && askToJoin ? (
        <div className="flex h-full w-full items-center justify-center">
          <Button onClick={joinAudio} color="primary">
            Connect
          </Button>
        </div>
      ) : (
        <div className="relative flex h-full w-full max-w-sm items-end justify-center rounded-xl py-6">
          {allowVideo ? (
            <div className="right-side">
              <video id="camera-video" hidden={isVideoOn ? false : true}></video>
              <video id="remote-video" hidden={isVideoSubed ? false : true}></video>
              {/* {isJoined && !isVideoSubed ? (
              <div className="waiting">You can shared channel {channel.current} to others.....</div>
            ) : null} */}
            </div>
          ) : (
            <Avatar
              src={avatar || '/gray.png'}
              size="lg"
              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
            />
          )}
          <div className="flex w-full items-center justify-center gap-4">
            <Button
              onClick={() => turnOnMicrophone(!isAudioOn)}
              className={classNames(!isAudioOn && 'opacity-25')}
              isIconOnly
              size="lg"
              radius="full"
            >
              {!isAudioOn ? <CiMicrophoneOff className="text-xl" /> : <CiMicrophoneOn className="text-xl" />}
            </Button>
            {allowVideo && (
              <Button
                onClick={() => turnOnCamera(!isVideoOn)}
                className={classNames(!isVideoOn && 'opacity-25')}
                isIconOnly
                size="lg"
                radius="full"
              >
                {!isVideoOn ? <TbVideoOff className="text-xl" /> : <TbVideo className="text-xl" />}
              </Button>
            )}
            {allowEndCall && (
              <Button onClick={endCall} isIconOnly size="lg" radius="full" color="danger">
                <IoCallOutline className="text-xl" />
              </Button>
            )}
          </div>
        </div>
      )}
      {/* <div className="left-side">
        <div className="buttons">
          <button onClick={() => turnOnCamera()} className={isVideoOn ? 'button-on' : ''}>
            Turn {isVideoOn ? 'off' : 'on'} camera
          </button>
          <button onClick={() => turnOnMicrophone()} className={isAudioOn ? 'button-on' : ''}>
            Turn {isAudioOn ? 'off' : 'on'} Microphone
          </button>
        </div>
        <h3>
          {`Please input the appid and token (`}
          <a href="https://www.agora.io/en/blog/how-to-get-started-with-agora">Create an account.</a>
          {`) `}
        </h3>
        <input defaultValue={appid.current} placeholder="appid" onChange={(e) => (appid.current = e.target.value)} />
        <input defaultValue={token.current} placeholder="token" onChange={(e) => (token.current = e.target.value)} />
        <h3>Please input the channel name</h3>
        <input defaultValue={channel.current} onChange={(e) => (channel.current = e.target.value)} />
        <div className="buttons">
          <button onClick={joinChannel} className={isJoined ? 'button-on' : ''}>
            Join Channel
          </button>
          <button onClick={publishVideo} className={isVideoPubed ? 'button-on' : ''}>
            Publish Video
          </button>
          <button onClick={publishAudio} className={isAudioPubed ? 'button-on' : ''}>
            Publish Audio
          </button>
          <button onClick={leaveChannel}>Leave Channel</button>
        </div>
      </div>
      <div className="right-side">
        <video id="camera-video" hidden={isVideoOn ? false : true}></video>
        <video id="remote-video" hidden={isVideoSubed ? false : true}></video>
        {isJoined && !isVideoSubed ? (
          <div className="waiting">You can shared channel {channel.current} to others.....</div>
        ) : null}
      </div> */}
    </>
  )
}

export default Call
