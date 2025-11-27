export const COURSES = [
  {
    id: 'intro-roblox',
    title: 'Intro to Roblox UGC',
    iconName: 'Shirt', 
    theme: 'orange',
    hero: {
      title: 'Creating Your First Roblox Item',
      desc: 'From zero to hero. We will create a custom T-Shirt for Elikost using professional layering and masking techniques.',
      downloads: [
        { label: 'Template', url: 'https://ibb.co/sv45mLBy', icon: '📄' },
        { label: 'Front Logo', url: 'https://ibb.co/mrV33m84', icon: '🐺' },
        { label: 'Back Shield', url: 'https://ibb.co/Wv1DCXsg', icon: '🛡️' }
      ]
    },
    lessons: [
      {
        id: 'r1',
        title: 'The Sandwich Theory (Layers)',
        desc: 'Think of a digital image like a sandwich. The Template is the bread. The Logo is the cheese. We use Layers to move the cheese without tearing the bread.',
        color: 'blue',
        demoComponent: 'DemoLayers', 
        steps: [
          'File → Open the Template (Base Layer).',
          'File → Open as Layers... the Logo (Top Layer).',
          'Select the Move Tool (Cross arrows).',
          'Drag the logo to the center of the chest area.'
        ],
        quiz: {
          question: 'Why do we use "Open as Layers"?',
          options: [
            { text: 'To stack the new image on top of the old one.', correct: true },
            { text: 'To open a brand new window.', correct: false }
          ]
        }
      },
      {
        id: 'r2',
        title: 'The Invisible Ink (Masks)',
        desc: 'Erasers are permanent. Masks are temporary. We use masks to hide the background of our shield logo so we can bring it back if we make a mistake.',
        color: 'indigo',
        demoComponent: 'DemoMask',
        steps: [
          'Right-click the Shield Layer → Add Layer Mask (White).',
          'Select the Paintbrush Tool.',
          'Paint with BLACK to hide (make transparent).',
          'Paint with WHITE to show (fix mistakes).'
        ],
        quiz: {
          question: 'In a mask, what does Black paint do?',
          options: [
            { text: 'It hides the image (Transparency).', correct: true },
            { text: 'It paints black color over the image.', correct: false }
          ]
        }
      },
      {
        id: 'r3',
        title: 'Signing Your Work',
        desc: 'Artists sign their paintings. You sign your merch. We will add the text "Follow Me Elikost" to the back of the shirt.',
        color: 'green',
        demoComponent: 'DemoText',
        steps: [
          'Select the Text Tool (Big "A" icon).',
          'Click on the back of the shirt template.',
          'Type: Follow Me Elikost.',
          'Use the Tool Options to change Font and Color.'
        ],
        quiz: {
          question: 'Which tool is used for typing?',
          options: [
            { text: 'The Text Tool (A).', correct: true },
            { text: 'The Pencil Tool.', correct: false }
          ]
        }
      }
    ]
  },
  {
    id: 'gimp-basics',
    title: 'GIMP Fundamentals',
    iconName: 'Paintbrush',
    theme: 'green',
    hero: {
      title: 'Become a Photo Wizard! 🧙‍♂️',
      desc: 'Before you design, you must master the tools. Learn the 4 magic spells of image manipulation.',
      downloads: []
    },
    lessons: [
      {
        id: 'g1',
        title: 'The Shrink Ray (Scaling)',
        desc: 'Use this spell when a picture is too huge to share. You can shrink a monster into a toy!',
        color: 'blue',
        demoComponent: 'DemoScale',
        steps: [
          'Image → Scale Image…',
          'CRITICAL: Keep the 🔗 Chain connected!',
          'Type a new width. Click Scale.'
        ],
        quiz: {
          question: 'Why keep the chain 🔗 connected?',
          options: [
            { text: 'To prevent the image from squishing.', correct: true },
            { text: 'To lock the screen.', correct: false }
          ]
        }
      },
      {
        id: 'g2',
        title: 'Magic Suitcase (Quality)',
        desc: 'Fold your digital clothes tight! Lowering "Quality" makes the file tiny so it sends fast.',
        color: 'purple',
        demoComponent: 'DemoQuality',
        steps: [
          'File → Export As… (.jpg)',
          'Lower the Quality Slider to save space.'
        ],
        quiz: {
          question: 'Why lower the quality?',
          options: [
            { text: 'To save file space.', correct: true },
            { text: 'To make colors brighter.', correct: false }
          ]
        }
      },
      {
        id: 'g3',
        title: 'Spin & Flip (Transform)',
        desc: 'Is your photo sideways? Rotate it. Want a mirror selfie? Flip it!',
        color: 'pink',
        demoComponent: 'DemoTransform',
        steps: [
          'Image → Transform',
          'Rotate: Spins the wheel 🎡',
          'Flip: Mirrors the image 🪞'
        ],
        quiz: {
          question: 'What does "Flip Horizontal" do?',
          options: [
            { text: 'Swaps Left and Right.', correct: true },
            { text: 'Rotates 90 degrees.', correct: false }
          ]
        }
      }
    ]
  }
];