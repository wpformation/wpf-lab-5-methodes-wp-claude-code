<?php
/**
 * Render template for wpf/lab-feature-twocol.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow      = isset( $attributes['eyebrowText'] )    ? $attributes['eyebrowText']    : '';
$viz_lines    = isset( $attributes['vizLines'] )       ? $attributes['vizLines']       : '';
$title_p1     = isset( $attributes['titlePart1'] )     ? $attributes['titlePart1']     : '';
$title_hl     = isset( $attributes['titleHighlight'] ) ? $attributes['titleHighlight'] : '';
$title_p2     = isset( $attributes['titlePart2'] )     ? $attributes['titlePart2']     : '';
$para1        = isset( $attributes['paragraph1'] )     ? $attributes['paragraph1']     : '';
$para2        = isset( $attributes['paragraph2'] )     ? $attributes['paragraph2']     : '';
$pros_title   = isset( $attributes['prosTitle'] )      ? $attributes['prosTitle']      : 'PROS';
$pros_list    = isset( $attributes['prosList'] )       ? $attributes['prosList']       : '';
$cons_title   = isset( $attributes['consTitle'] )      ? $attributes['consTitle']      : 'CONS';
$cons_list    = isset( $attributes['consList'] )       ? $attributes['consList']       : '';

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-feature alignfull',
) );

/**
 * Convert multiline strings to HTML lists or pre-wrapped lines.
 * Guard with function_exists to avoid "Cannot redeclare" if WP loads
 * this render.php multiple times in a single request.
 */
if ( ! function_exists( 'wpf_lab_lines_to_li' ) ) {
    function wpf_lab_lines_to_li( $multi ) {
        $lines = preg_split( '/\r\n|\r|\n/', trim( $multi ) );
        $out = '';
        foreach ( $lines as $line ) {
            $line = trim( $line );
            if ( '' !== $line ) {
                $out .= '<li>' . esc_html( $line ) . '</li>';
            }
        }
        return $out;
    }
}
if ( ! function_exists( 'wpf_lab_lines_to_br' ) ) {
    function wpf_lab_lines_to_br( $multi ) {
        $lines = preg_split( '/\r\n|\r|\n/', trim( $multi ) );
        $out_lines = array();
        foreach ( $lines as $line ) {
            if ( preg_match( '#^/\*.*\*/$#', $line ) || preg_match( '#^//#', $line ) ) {
                $out_lines[] = '<span class="wpf-lab-feature__viz-comment">' . esc_html( $line ) . '</span>';
            } elseif ( preg_match( '/^([a-zA-Z_-]+):\s*(.+)$/', $line, $m ) ) {
                $out_lines[] = '<span class="wpf-lab-feature__viz-key">' . esc_html( $m[1] ) . ':</span> <span class="wpf-lab-feature__viz-val">' . esc_html( $m[2] ) . '</span>';
            } elseif ( '' === trim( $line ) ) {
                $out_lines[] = '';
            } else {
                $out_lines[] = esc_html( $line );
            }
        }
        return implode( '<br>', $out_lines );
    }
}
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ( $eyebrow ) : ?>
        <p class="wpf-lab-feature__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
    <?php endif; ?>

    <div class="wpf-lab-feature__grid">
        <?php if ( $viz_lines ) : ?>
            <div class="wpf-lab-feature__viz"><?php
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                echo wpf_lab_lines_to_br( $viz_lines );
            ?></div>
        <?php endif; ?>

        <div class="wpf-lab-feature__body">
            <?php if ( $title_p1 || $title_hl ) : ?>
                <h2 class="wpf-lab-feature__title">
                    <?php echo esc_html( $title_p1 ); ?>
                    <?php if ( $title_hl ) : ?>
                        <span class="wpf-lab-feature__title-hl"><?php echo esc_html( $title_hl ); ?></span>
                    <?php endif; ?>
                    <?php if ( $title_p2 ) : ?>
                        <br><?php echo esc_html( $title_p2 ); ?>
                    <?php endif; ?>
                </h2>
            <?php endif; ?>

            <?php if ( $para1 ) : ?>
                <p><?php echo wp_kses_post( $para1 ); ?></p>
            <?php endif; ?>
            <?php if ( $para2 ) : ?>
                <p><?php echo wp_kses_post( $para2 ); ?></p>
            <?php endif; ?>

            <div class="wpf-lab-feature__proscons">
                <?php if ( $pros_list ) : ?>
                    <div class="wpf-lab-feature__pros">
                        <h4><?php echo esc_html( $pros_title ); ?></h4>
                        <ul><?php
                            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                            echo wpf_lab_lines_to_li( $pros_list );
                        ?></ul>
                    </div>
                <?php endif; ?>
                <?php if ( $cons_list ) : ?>
                    <div class="wpf-lab-feature__cons">
                        <h4><?php echo esc_html( $cons_title ); ?></h4>
                        <ul><?php
                            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                            echo wpf_lab_lines_to_li( $cons_list );
                        ?></ul>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
