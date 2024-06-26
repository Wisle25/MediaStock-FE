import { FaRegularAddressCard } from 'solid-icons/fa';
import { AiOutlineClockCircle } from 'solid-icons/ai';
import { FiPhoneCall } from 'solid-icons/fi';
import { AiOutlineMail } from 'solid-icons/ai';
import { createStore } from 'solid-js/store';
import { useToaster } from '../../Providers/ToastProvider';

const ContactAdmin = () => {
    const { showToast } = useToaster();

    const [formState, setFormState] = createStore({
        name: "",
        subject: "",
        message: ""
    });

    const handleInputChange = (e: Event) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormState({ [name]: value });
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const response = await fetch("https://helpful-serenity-production.up.railway.app/help", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formState)
        });
        
        showToast(await response.json())
    };

    return (
        <section id="contact" class="contact">
            <div class="mx-auto my-14 px-10 container">
                <header class="text-center section-header">
                    <p class="mb-4 font-bold text-[#012970] text-3xl">Kontak Kami</p>
                </header>
                <div class="gap-4 grid grid-cols-1 lg:grid-cols-2">
                    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                        <div class="space-y-4">
                            <ContactInfoBox icon={<FaRegularAddressCard class="mx-1 w-20 h-20" style={{ color: '#012970' }} />} title="Alamat" content="Jalan Ir. Sutami 36 Kentingan, Jebres, Surakarta, Jawa Tengah" />
                        </div>
                        <div class="space-y-4">
                            <ContactInfoBox icon={<AiOutlineClockCircle class="mx-1 w-20 h-20" style={{ color: '#012970' }} />}  title="Jam Aktif" content="Senin - Sabtu, 07:00 WIB - 17:00 WIB" />
                        </div>
                        <div class="space-y-4">
                            <ContactInfoBox icon={<FiPhoneCall class="mx-1 w-20 h-20" style={{ color: '#012970' }} />}  title="Telepon" content="+6281229006357" />
                        </div>
                        <div class="space-y-4">
                            <ContactInfoBox icon={<AiOutlineMail class="mx-1 w-20 h-20" style={{ color: '#012970' }} />}  title="Email" content="mediastock@gmail.com" />
                        </div>
                    </div>

                    <div class="px-4">
                        <form onSubmit={handleSubmit} class="bg-blue-50 shadow-md mb-4 px-8 pt-6 pb-8 rounded">
                            <div class="mb-4">
                                <ContactInput name="name" type="text" placeholder="Your Name" value={formState.name} onInput={handleInputChange} />
                            </div>
                            <div class="mb-4">
                                <ContactInput name="subject" type="text" placeholder="Subject" value={formState.subject} onInput={handleInputChange} />
                            </div>
                            <div class="mb-4">
                                <ContactTextarea name="message" placeholder="Message" value={formState.message} onInput={handleInputChange} />
                            </div>
                            <div class="mb-6 text-center">
                                <div class="error-message"></div>
                                <button type="submit" class="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-white">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactInfoBox = (props) => (
    <div class="bg-blue-50 shadow-md p-4 rounded-lg">
        <div>{props.icon}</div>
        <h3 class="mt-4 font-semibold text-2xl text-primary">{props.title}</h3>
        <p class="text-gray-700">{props.content}</p>
    </div>
);

const ContactInput = (props) => (
    <input type={props.type} name={props.name} class="block border-gray-200 bg-gray-50 focus:bg-white mb-3 px-4 py-3 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" placeholder={props.placeholder} value={props.value} onInput={props.onInput} required />
);

const ContactTextarea = (props) => (
    <textarea class="block border-gray-200 focus:border-gray-500 bg-gray-50 focus:bg-white mb-3 px-4 py-3 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none" name={props.name} rows="6" placeholder={props.placeholder} value={props.value} onInput={props.onInput} required></textarea>
);

export default ContactAdmin;
