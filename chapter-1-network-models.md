# Network Models

## Historical/Conceptual

### Biograph of a Model

All models are a simplified representation of the real thing. The human model ingores the many different types of body shapes, using only a single "optimal" figure. The model airplane lacks functional engines or the internal framework, and the computarized weather model might disregard subtle differences in wind temperatures or geology.

Additionally, a model must have at least all the major functions of the real item, but what constitutes a major rather than a minor function is open to opinion.

### Network Models

Network models face similar challenges. What functions define all networks? What details can you omit without rendering the model inaccurate? Does the model retain its usefulness when describing a network that does not employ all the layers?

In the early days of networking, different manufacturers made unique types of networks that functioned well. Part of the reason they worked was that every network manufacturer made everything. Back then, a single manufacturer provided everything for a customer when the customer purchased a network solution: all the hardware and all the software in one complete and expensive package. Although these networks worked fine as stand-alone networks, the proprietary nature of the hardware and software made it difficult—to put it mildly—to connect networks of multiple manufacturers. To interconnect networks and therefore improve the networking industry, someone needed to create a guide, a model, that described the functions of a network. Using this model, the people who made hardware and software could work together to make networks that worked
together well.

Two models tend to stand out: the OSI model and the TCP/IP model.

The best way to learn the OSI and TCP/IP models is to see them in action. For this reason, I'll introduce you to a small network that needs to copy a file from one computer to another. This example goes through each of the OSI and TCP/IP layers needed to copy that file, and I explain each step and why it is necessary. By the end of the chapter, you should have a definite handle on using either of these models as a tool to conceptualize networks. You'll continue to build on this knowledge throughout the book and turn your OSI and TCP/IP model knowledge into a powerful troubleshooting tool.

### THE OSI SEVEN-LAYER MODEL IN ACTION

Each layer in the OSI seven-layer model defines an important function in computer networking, and the protocols that operate at that layer offer solutions to those functions. _Protocols are sets of clearly defined rules, regulations, standards, and procedures that enable hardware and software developers to make devices and applications that function properly at a particular layer._ The OSI seven-layer model encourages modular design in networking, meaning that each layer has as little to do with the operation of other layers as possible. Think of it as an automobile assembly line. The guy painting the car doesn’t care about the gal putting doors on the car—he expects the assembly line process to make sure the cars he paints have doors. Each layer on the model trusts that the other layers on the model do their jobs.

The OSI seven layers are:

_Layer 7_ -> Application
_Layer 6_ -> Presentation
_Layer 5_ -> Session
_Layer 4_ -> Transport
_Layer 3_ -> Network
_Layer 2_ -> Data Link
_Layer 1_ -> Physical

The OSI seven layers are not laws of physics, anybody who wants to design a network can do it any way he or she wants. Although many protocols fit neatly into one of the seven layers, other do not.

Students have long used mnemonics for memorizing such lists. One of my favorites for the OSI seven-layer model is _“Please Do Not Throw Sausage Pizza Away.”_ Yum! Another great mnemonic that helps students to
memorize the layers from the top down is _“All People Seem To Need Data Processing.”_ Go with what works for you.

## Test Specific

### Let's Get Physical---- Network Hardware and Layers 1-2

Clearly the network needs a physical channel through which it can move bits of data between systems. Most networks use a cable like the one shown in Figure 1-5. This cable, known in the networking industry as unshielded twisted pair (UTP), usually contains four pairs of wires that can transmit and receive data.

Another key piece of hardware the network uses is a special box-like device that handles the flow of data from each computer to every other computer (Figure 1-6). This box is often tucked away in a closet or an equipment room. (The technology of the central box has changed over time. For now, let’s just call it the “central box.” I’ll get to variations in a bit.) Each system on the network has its own cable that runs to the central box. Think of the box as being like one of those old-time telephone switchboards, where operators created connections between persons who called in wanting to reach other telephone users.

Layer 1 of the OSI model defines the method of moving data between computers, so the cabling and central box are part of the Physical layer (Layer 1). _Anything that moves data from one system to another, such as copper cabling, fiber optics, even radio waves, is part of the OSI Physical layer._ Layer 1 doesn’t care what data goes through; it just moves the data from one system to another system. Figure 1-7 shows the MHTechEd network in the OSI seven-layer model thus far. Note that each system has the full range of layers, so data from Janelle’s computer can flow to Dana’s computer. (I’ll cover what a “hub” is shortly.)

The real magic of a network starts with the _network interface card_, or NIC (pronounced “nick”), which serves as the interface between the PC and the network. While NICs come in a wide array of shapes and sizes, the ones at MHTechEd look like Figure 1-8.

You might be tempted to categorize the NIC as part of the Physical layer at this point, and you’d have a valid argument. The NIC clearly is necessary for the physical connection to take place. Many authors put the NIC in OSI Layer 2, the Data Link layer, though, so clearly something else is happening inside the NIC. Let’s take a closer look.

## The NIC

To understand networks, you must understand how NICs work. The network must provide a mechanism that gives each system a unique identifier—like a telephone number—so data is delivered to the right system. That’s one of the NIC’s most important jobs. Inside every NIC, burned onto some type of ROM chip, is special firmware containing a unique identifier with a 48-bit value called the media access control address, or MAC address.
No two NICs ever share the same MAC address—ever. Any company that makes NICs must contact the Institute of Electrical and Electronics Engineers (IEEE) and request a block of MAC addresses, which the company then
burns into the ROMs on its NICs. Many NIC makers also print the MAC address on the surface of each NIC, as shown in Figure 1-11. Note that the NIC shown here displays the MAC address in hexadecimal notation. Count the number of hex characters—because each hex character represents 4 bits, it takes 12 hex characters to represent 48 bits. MAC addresses are always written in hex.

_Hexadecimal Aside_
A hexadecimal numbering system uses base 16 for representing numbers—that would be 0–15 (in base 10 values). Contrast this with the more common decimal numbering system, numbered 0–9. Just as with decimal, people who work with hexadecimal need a single character to represent each number for the 16 values. Using 0–9 makes sense, but then hex is represented in letter form for the values 10–15 (A, B, C, D, E, F).

Hexadecimal works great with binary. Four bits provide the values of 0–15. 0001, for example, is the value 1; 1000 in binary is 8; 1111 is 15. When we work with MAC addresses, it’s far easier to break each 4-bit section of the 48-bit address and translate that into hex. Humans work better that way!

_Back to MAC Addresses_
The MAC address in Figure 1-11 is 004005-607D49, although in print, we represent the MAC address as 00–40–05–60–7D–49. The first six digits, in this example 00–40–05, represent the number of the NIC manufacturer. _Once the IEEE issues those six hex digits to a manufacturer—referred to as the Organizationally Unique Identifier (OUI), no other manufacturer may use them. The last six digits, in this example 60–7D–49, are the manufacturer’s unique serial number for that NIC; this portion of the MAC is often referred to as the device ID._

Would you like to see the MAC address for your NIC? If you have a Windows system, type _ipconfig /all_ from a command prompt to display the MAC address (Figure 1-12). Note that ipconfig calls the MAC address the physical address, which is an important distinction, as you’ll see a bit later in the chapter. (For macOS, type ifconfig from a terminal; for Linux, type ip a from a terminal to get similar results.)

Once you understand how data moves along the wire, the next question is, how does the network get the right data to the right system? All networks transmit data by breaking whatever is moving across the Physical layer (files, print jobs, Web pages, and so forth) into discrete chunks called frames. _A frame is basically a container for a chunk of data moving across a network._ A frame encapsulates—puts a wrapper around—information and data for easier transmission. (More on this later in the chapter.) The NIC creates and sends, as well as receives and reads, these frames.

_NOTE_ The unit of data specified by a protocol at each layer of the OSI seven-layer model is called a _protocol data unit (PDU)_. A frame is the PDU for Layer 2.

_NOTE_ Different frame types are used in different networks. All NICs on the same network must use the same frame type, or they will not be able to communicate with other NICs.

Even though a frame is a string of ones and zeroes, we often draw frames as a series of rectangles, each rectangle representing a part of the string of ones and zeroes. You will see this type of frame representation used quite often, so you should become comfortable with it (even though I still prefer to see frames as pneumatic canisters).

Note that the frame begins with the MAC address of the NIC to which the data is to be sent, followed by the MAC address of the sending NIC. Next comes the Type field, which indicates what’s encapsulated in the frame. Then comes the Data field that contains what’s encapsulated, followed by a special bit of checking information called the frame check sequence (FCS). The FCS uses a type of binary math called a cyclic redundancy check (CRC) that the receiving NIC uses to verify that the data arrived intact.

You can think of a frame in a different way as having three sections. The header (MAC addresses and Type) starts, followed by the payload (whatever is encapsulated in the frame); this is followed by the trailer (the FCS).

So, what’s inside the data part of the frame? You neither know nor care. The data may be a part of a file, a piece of a print job, or part of a Web page.

NICs aren’t concerned with content! The NIC simply takes whatever data is passed to it via its device driver and addresses it for the correct system. Special software will take care of what data gets sent and what happens to that data when it arrives. This is the beauty of imagining frames as little pneumatic canisters (Figure 1-18). A canister can carry anything from dirt to diamonds—the NIC doesn’t care one bit (pardon the pun).

Like a canister, a frame can hold only a certain amount of data. Different types of networks use different sizes of frames, but the frames used in most wired networks hold at most 1500 bytes of data. This raises a new question: what happens when the data to be sent is larger than the frame size? Well, the sending system’s software must chop the data up into nice, frame-sized chunks, which it then hands to the NIC for sending. As the receiving system begins to accept the incoming frames, the receiving system’s software recombines the data chunks as they come in from the network. I’ll show how this disassembling and reassembling is done in a moment—first, let’s see how the frames get to the right system!

_Into the Central Box_

When a system sends a frame out on the network, the frame goes into the central box. What happens next depends on the technology of the central box. In the early days of networking, the central box was called a hub. A hub was a dumb device, essentially just a repeater. When it received a frame, the hub made an exact copy of that frame, sending a copy of the original frame out of all connected ports except the port on which the message originated. The interesting part of this process was when the copy of the frame came into all the other systems. I like to visualize a frame sliding onto the receiving NIC’s “frame assembly table,” where the electronics of the NIC inspected it. (This doesn’t exist; use your imagination!) Here’s where the magic took place: only the NIC to which the frame was addressed would process that frame—the other NICs simply dropped it when they saw that it was not addressed to their MAC address. This is important to appreciate: with a hub, every frame sent on a network was received by every NIC, but only the NIC with the matching MAC address would process that frame.

Later networks replaced the hub with a smarter device called a switch. Switches, as you’ll see in much more detail as we go deeper into networking, filter traffic by MAC address. Rather than sending all incoming frames to all network devices connected to it, a switch sends the frame only to the interface associated with the destination MAC address.

_PAGE 64_
