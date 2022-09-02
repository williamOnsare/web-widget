import * as React from "react";
import './style.css'

const sampleMessages = [
    {
        sender: 'customer',
        message: "Hi, I can't log in into my account. Can you help me with this?",
    },
    {
        sender: 'support',
        message: "Hello Lindah! No worries. We will send you a link to reset your password.",
    },
    {
        sender: 'customer',
        message: 'Thank you!',
    },
    {
        sender: 'support',
        message: "You welcome",
    },
    {
        sender: 'customer',
        message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
]

const WebWidget = () => {
    const [textValue, settextValue] = React.useState('')
    const [isWidgetOpen, setIsWidgetOpen] = React.useState(false)
    const [posts, setPosts] = React.useState([...sampleMessages])

    const postsListRef = React.useRef()

    const handleResponse = React.useCallback((postValue) => {
        if (postValue.trim()) {
            const textCopy = postValue
            settextValue(initial => '')
            const newCustomerPost = {
                sender: 'customer',
                message: textCopy
            }
            setPosts(initialPosts => [...initialPosts, newCustomerPost])

            const fakeSupportPost = {
                sender: 'support',
                message: `Hello cumstomer, Kindly provide more details about ${textCopy}`
            }
            setTimeout(() => {
                setPosts(initialPosts => [...initialPosts, fakeSupportPost])
            }, 5000);
        } else {
            alert('No message provided')
        }
    }, [])

    React.useEffect(() => {
        if (posts || isWidgetOpen) {
            const postsListingHolder = postsListRef.current
            setTimeout(() => {
                postsListingHolder?.scrollTo({
                    top: postsListingHolder?.scrollHeight,
                    behavior: 'smooth',
                })
            }, 0);
        }
    }, [posts, isWidgetOpen])

    return <>{isWidgetOpen ? (
        <div className={'messaging_widget__app_open'}>
            <div className='messaging_widget__header'>
                <div className='messaging_widget__header_icon_wrapper'>
                    <img className='messaging_widget__header_icon' src="https://williamonsare.github.io/web-widget/assets/customer_support_icon.svg" alt="support-team" />
                </div>
                <h3 className='messaging_widget__header_title'>Customer Support</h3>
                <div className='messaging_widget__header_close_btn' onClick={() => setIsWidgetOpen(initial => false)}>
                    <img className='messaging_widget__header_close_btn_icon' src="https://williamonsare.github.io/web-widget/assets/close_icon.svg" alt="close widget" />
                </div>
            </div>
            <div className='messaging_widget__body' ref={postsListRef}>
                {posts.map((msg, index) => <div key={index} className='messaging_widget__post'>
                    <div className={msg.sender === 'customer' ? 'messaging_widget__post_content_wrapper_customer' : 'messaging_widget__post_content_wrapper_support'}>
                        <div className='messaging_widget__post_content'>{msg.message}</div>
                    </div>
                    <div className={msg.sender === 'customer' ? 'messaging_widget__post_sender_customer' : 'messaging_widget__post_sender_support'}>{msg.sender === 'customer' ? 'Visitor' : 'Support Agent'}</div>
                </div>)}
            </div>
            <div className='messaging_widget__footer'>
                <div className='messaging_widget__textarea_wrapper'>
                    <textarea className='messaging_widget__textarea' name="" id="" cols="" rows="2" value={textValue} onChange={e => {
                        settextValue(e.target.value)
                    }}></textarea>
                </div>
                <div className='messaging_widget__sendbtn' onClick={() => handleResponse(textValue)}>
                    <img className='messaging_widget__send_icon' src="https://williamonsare.github.io/web-widget/assets/send_icon.svg" alt="send message" />
                </div>
            </div>
        </div>
    ) : (
        <div className='messaging_widget__app' onClick={() => setIsWidgetOpen(initial => true)}>
            <div className='messaging_widget__cta'>
                <img className='messaging_widget__cta_icon' src="https://williamonsare.github.io/web-widget/assets/customer_support_icon.svg" alt="Need Help?" />
            </div>
        </div>
    )}</>;
};

export default WebWidget;
