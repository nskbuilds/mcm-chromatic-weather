/**
 * Chromatic Animation Component
 * A reusable animation that transitions smoothly through color spectrums
 */

class ChromaticAnimation {
    constructor(options = {}) {
        this.colors = options.colors || [
            '#FF007F', // Hot Pink
            '#00FFFF', // Cyan
            '#FFD700', // Gold
            '#00FF00', // Lime Green
            '#FF007F'  // Back to Hot Pink
        ];
        this.duration = options.duration || 8000; // ms
        this.easing = options.easing || 'ease-in-out';
        this.animationId = options.animationId || 'chromatic-animation';
        this.isPlaying = false;
    }

    /**
     * Create and inject the keyframe animation into the document
     */
    createKeyframes() {
        const styleId = `${this.animationId}-style`;
        
        // Remove existing style if present
        const existing = document.getElementById(styleId);
        if (existing) existing.remove();

        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;

        // Build keyframes from colors array
        const colorStops = this.colors
            .map((color, i) => {
                const percentage = (i / (this.colors.length - 1)) * 100;
                return `${percentage}% { color: ${color}; text-shadow: 0 0 20px ${color}88; }`;
            })
            .join('\n');

        styleSheet.textContent = `
            @keyframes ${this.animationId} {
                ${colorStops}
            }
        `;

        document.head.appendChild(styleSheet);
    }

    /**
     * Apply chromatic animation to an element
     * @param {HTMLElement} element - Target element
     * @param {Object} options - Animation options
     */
    apply(element, options = {}) {
        this.createKeyframes();

        const animationDuration = options.duration || this.duration;
        const animationEasing = options.easing || this.easing;

        element.style.animation = `${this.animationId} ${animationDuration}ms ${animationEasing} infinite`;
        this.isPlaying = true;

        return element;
    }

    /**
     * Stop the animation
     * @param {HTMLElement} element - Target element
     */
    stop(element) {
        element.style.animation = 'none';
        this.isPlaying = false;
    }

    /**
     * Create a standalone chromatic animation box
     * @returns {HTMLElement}
     */
    createAnimatedBox(width = 100, height = 100) {
        const box = document.createElement('div');
        box.className = 'chromatic-box';
        box.style.cssText = `
            width: ${width}px;
            height: ${height}px;
            border-radius: 10px;
            background: rgba(255, 0, 127, 0.3);
            border: 2px solid;
            animation: ${this.animationId} ${this.duration}ms ${this.easing} infinite;
            box-shadow: 0 0 20px rgba(255, 0, 127, 0.5);
        `;

        this.createKeyframes();

        // Animate border color as well
        const borderKeyframeId = `${this.animationId}-border`;
        const borderStyleId = `${this.animationId}-border-style`;
        const existingBorderStyle = document.getElementById(borderStyleId);
        if (existingBorderStyle) existingBorderStyle.remove();

        const borderStyleSheet = document.createElement('style');
        borderStyleSheet.id = borderStyleId;

        const borderColorStops = this.colors
            .map((color, i) => {
                const percentage = (i / (this.colors.length - 1)) * 100;
                return `${percentage}% { border-color: ${color}; }`;
            })
            .join('\n');

        borderStyleSheet.textContent = `
            @keyframes ${borderKeyframeId} {
                ${borderColorStops}
            }
        `;
        document.head.appendChild(borderStyleSheet);

        // Add border animation
        box.style.animation = `${this.animationId} ${this.duration}ms ${this.easing} infinite, ${borderKeyframeId} ${this.duration}ms ${this.easing} infinite`;

        return box;
    }

    /**
     * Create an animated gradient background
     * @returns {HTMLElement}
     */
    createAnimatedGradient(width = 200, height = 200) {
        const gradient = document.createElement('div');
        gradient.className = 'chromatic-gradient';
        gradient.style.cssText = `
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(
                45deg,
                rgba(255, 0, 127, 0.5) 0%,
                rgba(0, 255, 255, 0.5) 25%,
                rgba(255, 215, 0, 0.5) 50%,
                rgba(0, 255, 0, 0.5) 75%,
                rgba(255, 0, 127, 0.5) 100%
            );
            background-size: 400% 400%;
            animation: chromatic-gradient ${this.duration}ms ${this.easing} infinite;
            border-radius: 15px;
        `;

        const gradientStyleId = 'chromatic-gradient-style';
        const existingGradientStyle = document.getElementById(gradientStyleId);
        if (existingGradientStyle) existingGradientStyle.remove();

        const gradientStyleSheet = document.createElement('style');
        gradientStyleSheet.id = gradientStyleId;
        gradientStyleSheet.textContent = `
            @keyframes chromatic-gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(gradientStyleSheet);

        return gradient;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChromaticAnimation;
}
